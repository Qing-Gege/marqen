import type { VNode } from 'snabbdom';
import type { Muya } from '../../index';
import type { Token } from '../../inlineRenderer/types';
import type { ISelection } from '../../selection/types';
import type { IBaseOptions } from '../types';

import type { FormatToolIcon, ParagraphStyle } from './config';
import Format from '../../block/base/format';
import { isKeyboardEvent } from '../../utils';
import { getCursorReference } from '../../selection';
import { h, patch } from '../../utils/snabbdom';
import BaseFloat from '../baseFloat';
import icons, { paragraphStyles } from './config';
import './index.css';

/** Default float options for inline format toolbar */
const defaultOptions = {
    placement: 'top' as const,
    offsetOptions: {
        mainAxis: 5,
        crossAxis: 0,
        alignmentAxis: 0,
    },
    showArrow: false,
};

/** Format keyboard shortcuts without shift modifier */
const FORMAT_SHORTCUTS = {
    b: 'strong',
    i: 'em',
    u: 'u',
    d: 'del',
    k: 'link',
    '=': 'sub',
} as const;

/** Format keyboard shortcuts with shift modifier */
const FORMAT_SHORTCUTS_SHIFT = {
    h: 'mark',
    i: 'image',
    x: 'del',
    '=': 'sup',
    '+': 'sup',
} as const;

/** Keys that should not trigger toolbar hiding */
const NON_EDITING_KEYS = new Set([
    'Shift',
    'Control',
    'Meta',
    'Alt',
    'Tab',
]);
const PURE_MODIFIER_KEYS = new Set(['Alt', 'Control', 'Meta', 'Shift']);

interface IHeadingState {
    name: 'atx-heading';
    meta: {
        level: number;
    };
}

function isHeadingState(state: unknown): state is IHeadingState {
    if (!state || typeof state !== 'object')
        return false;

    const maybeState = state as { meta?: unknown; name?: unknown };
    if (maybeState.name !== 'atx-heading' || !maybeState.meta || typeof maybeState.meta !== 'object')
        return false;

    const maybeMeta = maybeState.meta as { level?: unknown };

    return typeof maybeMeta.level === 'number';
}

function isNodeInEditor(node: Node | null, editorNode: HTMLElement) {
    if (!node)
        return false;

    return editorNode.contains(node.nodeType === Node.TEXT_NODE ? node.parentNode : node);
}

/**
 * Inline format toolbar for text formatting
 * Provides quick access to text formatting options like bold, italic, etc.
 * Appears when text is selected
 */
export class InlineFormatToolbar extends BaseFloat {
    static pluginName = 'formatPicker';

    /** Previous virtual node for patching */
    private _oldVNode: VNode | null = null;

    /** The block containing the selected text */
    private _block: Format | null = null;

    /** Currently applied formats in the selection */
    private _formats: Token[] = [];

    /** Whether the paragraph style menu is open */
    private _paragraphMenuOpen = false;

    /** Pending selection sync frame */
    private _selectionSyncFrame: number | null = null;

    /** Pending delayed sync timer used after mouse selection ends */
    private _selectionSyncTimer: ReturnType<typeof setTimeout> | null = null;

    /** Whether the user is actively dragging a selection */
    private _isPointerSelecting = false;

    /** Last stable editor selection captured before the toolbar was used */
    private _lastSelection: ISelection | null = null;

    /** Toolbar configuration options */
    public override options: IBaseOptions;

    /** Format tool icons configuration */
    private _icons: FormatToolIcon[] = icons;

    /** Container element for the format toolbar */
    private _formatContainer: HTMLDivElement = document.createElement('div');

    /**
     * Create inline format toolbar instance
     * @param muya - Muya editor instance
     * @param options - Toolbar options
     */
    constructor(muya: Muya, options = {}) {
        const name = 'mu-format-picker';
        const opts = Object.assign({}, defaultOptions, options);
        super(muya, name, opts);
        this.options = opts;
        this.container!.appendChild(this._formatContainer);
        this.floatBox!.classList.add('mu-format-picker-container');
        this.listen();
    }

    /**
     * Listen to format picker events and keyboard shortcuts
     */
    override listen() {
        const { eventCenter, domNode, editor } = this.muya;
        super.listen();

        eventCenter.subscribe('muya-format-picker', ({ reference, block }) => {
            if (this._isPointerSelecting)
                return;

            if (reference) {
                this._lastSelection = editor.selection.getSelection();
                this._block = block;
                this._formats = block.getFormatsInRange().formats;
                requestAnimationFrame(() => {
                    this.show(reference);
                    this._render();
                });
            }
            else {
                this._paragraphMenuOpen = false;
                this.hide();
            }
        });

        eventCenter.attachDOMEvent(domNode, 'keydown', (event) => {
            this._handleKeydown(event, editor);
        });
        eventCenter.attachDOMEvent(this._formatContainer, 'mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });
        eventCenter.attachDOMEvent(domNode, 'mousedown', (event) => {
            const target = event.target instanceof Node ? event.target : null;
            if (target && this.floatBox?.contains(target))
                return;

            this._isPointerSelecting = true;
            this._paragraphMenuOpen = false;
            this.hide();
        });
        eventCenter.attachDOMEvent(document, 'mouseup', () => {
            const wasPointerSelecting = this._isPointerSelecting;
            this._isPointerSelecting = false;
            if (wasPointerSelecting)
                this._scheduleSelectionSync(80);
        });
        eventCenter.attachDOMEvent(domNode, 'keyup', (event) => {
            if (isKeyboardEvent(event) && PURE_MODIFIER_KEYS.has(event.key))
                return;

            this._scheduleSelectionSync();
        });
        eventCenter.attachDOMEvent(document, 'selectionchange', () => {
            if (this._isPointerSelecting)
                return;

            this._scheduleSelectionSync();
        });
    }

    /**
     * Handle keyboard events for format shortcuts and toolbar hiding
     * @param event - Keyboard event
     * @param editor - Editor instance
     */
    private _handleKeydown(event: Event, editor: typeof this.muya.editor) {
        if (!isKeyboardEvent(event))
            return;

        const { key, shiftKey, metaKey, ctrlKey, altKey } = event;
        if (PURE_MODIFIER_KEYS.has(key))
            return;

        const selection = editor.selection.getSelection();
        if (!selection)
            return;

        const { anchorBlock, isSelectionInSameBlock } = selection;

        if (!isSelectionInSameBlock)
            return;

        // Hide toolbar on editing operations
        if (!(anchorBlock instanceof Format) || (!metaKey && !ctrlKey)) {
            this._hideOnEditingKey(key, metaKey, ctrlKey);
            return;
        }

        // Handle format shortcuts
        this._handleFormatShortcut(event, key, shiftKey, metaKey, ctrlKey, altKey, anchorBlock);
    }

    /**
     * Hide toolbar when an editing key is pressed
     * @param key - Key name
     * @param metaKey - Meta key state
     * @param ctrlKey - Control key state
     */
    private _hideOnEditingKey(key: string, metaKey: boolean, ctrlKey: boolean) {
        // Don't hide if it's a modifier/navigation key or if format shortcut is pressed
        if (NON_EDITING_KEYS.has(key) || metaKey || ctrlKey)
            return;

        if (this.status) {
            this._paragraphMenuOpen = false;
            this.hide();
        }
    }

    /**
     * Handle format keyboard shortcuts
     * @param event - Keyboard event
     * @param key - Key name
     * @param shiftKey - Shift key state
     * @param anchorBlock - Anchor block
     */
    private _handleFormatShortcut(
        event: KeyboardEvent,
        key: string,
        shiftKey: boolean,
        metaKey: boolean,
        ctrlKey: boolean,
        altKey: boolean,
        anchorBlock: Format,
    ) {
        const normalizedKey = key.toLowerCase();
        const hasCommandKey = metaKey || ctrlKey;

        if (hasCommandKey && altKey && /^[1-6]$/.test(normalizedKey)) {
            event.preventDefault();
            this.muya.updateParagraph(`heading ${normalizedKey}`);
            return;
        }

        if (hasCommandKey && altKey && normalizedKey === '0') {
            event.preventDefault();
            this.muya.updateParagraph('paragraph');
            return;
        }

        if (hasCommandKey && shiftKey && normalizedKey === 'n') {
            event.preventDefault();
            this.muya.updateParagraph('paragraph');
            return;
        }

        if (hasCommandKey && shiftKey && normalizedKey === 'l') {
            event.preventDefault();
            this.muya.updateParagraph('ul-bullet');
            return;
        }

        if (hasCommandKey && !shiftKey && (key === ' ' || key === 'Spacebar')) {
            event.preventDefault();
            anchorBlock.format('clear');
            return;
        }

        const shortcuts = shiftKey ? FORMAT_SHORTCUTS_SHIFT : FORMAT_SHORTCUTS;
        const formatType = shortcuts[normalizedKey as keyof typeof shortcuts];

        if (formatType) {
            event.preventDefault();
            anchorBlock.format(formatType);
        }
    }

    /**
     * Let every selection path (drag, triple-click, keyboard) surface the same
     * toolbar when text is selected inside one editable block.
     */
    private _scheduleSelectionSync(delay = 0) {
        if (this._selectionSyncTimer != null) {
            clearTimeout(this._selectionSyncTimer);
            this._selectionSyncTimer = null;
        }

        if (this._selectionSyncFrame != null)
            cancelAnimationFrame(this._selectionSyncFrame);

        const sync = () => {
            this._selectionSyncFrame = requestAnimationFrame(() => {
                this._selectionSyncFrame = null;
                this._syncToolbarFromSelection();
            });
        };

        if (delay > 0)
            this._selectionSyncTimer = setTimeout(sync, delay);
        else
            sync();
    }

    /**
     * Read the live DOM selection and show or hide the toolbar.
     */
    private _syncToolbarFromSelection() {
        const domSelection = document.getSelection();
        if (
            this._isPointerSelecting
            || !domSelection
            || domSelection.rangeCount === 0
            || domSelection.isCollapsed
        ) {
            this._paragraphMenuOpen = false;
            this.hide();
            return;
        }

        const range = domSelection.getRangeAt(0);
        if (
            !isNodeInEditor(domSelection.anchorNode, this.muya.domNode)
            || !isNodeInEditor(domSelection.focusNode, this.muya.domNode)
        ) {
            this._paragraphMenuOpen = false;
            this.hide();
            return;
        }

        const currentSelection = this.muya.editor.selection.getSelection();
        const selectedBlock = currentSelection?.anchorBlock;
        const hasFormattableSelection = !!(
            currentSelection
            && currentSelection.isSelectionInSameBlock
            && selectedBlock instanceof Format
            && currentSelection.anchor.offset !== currentSelection.focus.offset
        );

        if (hasFormattableSelection && selectedBlock instanceof Format) {
            this._lastSelection = currentSelection;
            this._block = selectedBlock;
            this._formats = selectedBlock.getFormatsInRange().formats;
        }
        else {
            this._lastSelection = currentSelection;
            this._block = null;
            this._formats = [];
            this._paragraphMenuOpen = false;
            this.hide();
            return;
        }

        const rect = range.getBoundingClientRect();
        const reference = rect.width > 0 || rect.height > 0
            ? {
                    getBoundingClientRect: () => rect,
                    clientWidth: rect.width,
                    clientHeight: rect.height,
                }
            : getCursorReference();

        if (!reference)
            return;

        this.show(reference);
        this._render();
    }

    /**
     * Render the format toolbar UI
     */
    private _render() {
        const { _icons: icons, _oldVNode: oldVNode, _formatContainer: formatContainer, _formats: formats } = this;
        const { i18n } = this.muya;

        const children = [
            this._createParagraphStyleItem(this._getParagraphStyle(), i18n),
            h('li.separator', ''),
            ...icons.map(icon => this._createIconItem(icon, formats, i18n)),
        ];
        const vnode = h('ul', children);

        patch(oldVNode || formatContainer, vnode);
        this._oldVNode = vnode;
    }

    /**
     * Detect the paragraph style around the current selection.
     */
    private _getParagraphStyle(): ParagraphStyle {
        let block = this._block?.parent || null;
        while (block) {
            const blockState = block.getState();
            const blockName = block.blockName;

            if (isHeadingState(blockState)) {
                return paragraphStyles.find(
                    style => style.command === `heading ${blockState.meta.level}`,
                ) ?? paragraphStyles[0];
            }

            const matchedStyle = paragraphStyles.find((style) => {
                switch (style.command) {
                    case 'ol-order':
                        return blockName === 'order-list';
                    case 'ul-bullet':
                        return blockName === 'bullet-list';
                    case 'ul-task':
                        return blockName === 'task-list';
                    case 'pre':
                        return blockName === 'code-block';
                    case 'blockquote':
                        return blockName === 'block-quote';
                    default:
                        return false;
                }
            });

            if (matchedStyle)
                return matchedStyle;

            block = block.parent || null;
        }

        return paragraphStyles[0];
    }

    /**
     * Create the paragraph style dropdown item.
     * @param activeStyle - Currently selected paragraph style
     * @param i18n - Internationalization instance
     */
    private _createParagraphStyleItem(activeStyle: ParagraphStyle, i18n: typeof this.muya.i18n) {
        const label = i18n.t(activeStyle.label);
        const menu = this._paragraphMenuOpen
            ? h(
                'ol.block-style-menu',
                {
                    style: {
                        'max-height': `${this._getParagraphMenuMaxHeight()}px`,
                    },
                },
                paragraphStyles.map(style => this._createParagraphStyleOption(style, activeStyle, i18n)),
            )
            : null;

        const title = activeStyle.shortcut
            ? `${i18n.t(activeStyle.label)}\n${activeStyle.shortcut}`
            : i18n.t(activeStyle.label);

        return h(
            `li.item.block-style.${activeStyle.type}`,
            {
                attrs: {
                    title,
                },
                on: {
                    mousedown: event => this._toggleParagraphMenu(event),
                },
            },
            [
                h(
                    'button.block-style-trigger',
                    {
                        attrs: {
                            type: 'button',
                        },
                    },
                    [
                        h('span.block-style-label', label),
                        h('span.block-style-caret', '⌄'),
                    ],
                ),
                menu,
            ],
        );
    }

    /**
     * Create one dropdown option for paragraph style selection.
     * @param style - Available paragraph style
     * @param activeStyle - Currently selected paragraph style
     * @param i18n - Internationalization instance
     */
    private _createParagraphStyleOption(
        style: ParagraphStyle,
        activeStyle: ParagraphStyle,
        i18n: typeof this.muya.i18n,
    ) {
        const activeClass = style.type === activeStyle.type ? '.active' : '';
        const shortcut = style.shortcut
            ? h('span.block-style-option-shortcut', style.shortcut)
            : h('span.block-style-option-shortcut', style.shortLabel);
        const icon = style.icon
            ? h(
                    'i.block-style-option-icon',
                    {
                        style: {
                            'background': `url(${style.icon}) no-repeat`,
                            'background-size': '100%',
                        },
                    },
                    '',
                )
            : h('span.block-style-option-icon.text', style.shortLabel);

        return h(
            `li.block-style-option.${style.type}${activeClass}`,
            {
                attrs: {
                    title: i18n.t(style.label),
                },
                on: {
                    mousedown: event => this._selectParagraphStyle(event, style),
                },
            },
            [
                icon,
                h('span.block-style-option-label', i18n.t(style.label)),
                shortcut,
            ],
        );
    }

    /**
     * Create a format icon item
     * @param icon - Icon configuration
     * @param formats - Currently applied formats
     * @param i18n - Internationalization instance
     */
    private _createIconItem(icon: FormatToolIcon, formats: Token[], i18n: typeof this.muya.i18n) {
        const iconElement = icon.icon
            ? h(
                    'i.icon',
                    h(
                        'i.icon-inner',
                        {
                            style: {
                                'background': `url(${icon.icon}) no-repeat`,
                                'background-size': '100%',
                            },
                        },
                        '',
                    ),
                )
            : h('span.text-format-icon', icon.label ?? '');

        const iconWrapper = h('div.icon-wrapper', iconElement);

        const isActive = formats.some((f) => {
            if (f.type === icon.type)
                return true;

            return f.type === 'html_tag' && (
                f.tag === icon.type
                || (icon.type === 'del' && f.tag === 's')
                || (icon.type === 'inline_code' && f.tag === 'code')
            );
        });

        const itemSelector = `li.item.${icon.type}${isActive ? '.active' : ''}`;

        return h(
            itemSelector,
            {
                attrs: {
                    title: `${i18n.t(icon.tooltip)}\n${icon.shortcut}`,
                },
                on: {
                    mousedown: event => this._selectItem(event, icon),
                },
            },
            [iconWrapper],
        );
    }

    /**
     * Handle format item selection
     * @param event - Click event
     * @param item - Selected format tool icon
     */
    private _selectItem(event: Event, item: FormatToolIcon) {
        event.preventDefault();
        event.stopPropagation();
        this._paragraphMenuOpen = false;

        if (item.type === 'quote-block') {
            this._restoreLastSelection();
            this.muya.updateParagraph('blockquote');
            this.hide();
            return;
        }

        this._restoreLastSelection();

        const block = this._getSelectedFormatBlock();
        if (!block)
            return;

        block.format(item.type);

        // Hide toolbar for link and image, re-render for other formats
        if (/link|image/.test(item.type)) {
            this.hide();
        }
        else {
            this._block = block;
            this._formats = block.getFormatsInRange().formats;
            this._render();
        }
    }

    /**
     * Toggle the paragraph style menu.
     * @param event - Click event
     */
    private _toggleParagraphMenu(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this._paragraphMenuOpen = !this._paragraphMenuOpen;
        this._render();
    }

    /**
     * Convert the selected block to the requested paragraph style.
     * @param event - Click event
     * @param style - Selected paragraph style
     */
    private _selectParagraphStyle(event: Event, style: ParagraphStyle) {
        event.preventDefault();
        event.stopPropagation();

        this._restoreLastSelection();

        this._paragraphMenuOpen = false;
        this.muya.updateParagraph(style.command);
        this.hide();
    }

    private _restoreLastSelection() {
        if (!this._lastSelection)
            return;

        const { selection } = this.muya.editor;
        const {
            anchor,
            focus,
            anchorBlock,
            anchorPath,
            focusBlock,
            focusPath,
        } = this._lastSelection;

        selection.setSelection({
            anchor,
            focus,
            anchorBlock,
            anchorPath,
            focusBlock,
            focusPath,
        });
    }

    private _getSelectedFormatBlock() {
        if (this._block)
            return this._block;

        const selection = this.muya.editor.selection.getSelection() ?? this._lastSelection;
        const block = selection?.anchorBlock;

        return selection?.isSelectionInSameBlock && block instanceof Format
            ? block
            : null;
    }

    private _getParagraphMenuMaxHeight() {
        const viewportPadding = 24;
        const minHeight = 180;
        const maxHeight = 420;
        const fallbackHeight = 320;

        if (!this.floatBox)
            return fallbackHeight;

        const { bottom } = this.floatBox.getBoundingClientRect();
        const availableHeight = window.innerHeight - bottom - viewportPadding;

        return Math.max(minHeight, Math.min(maxHeight, availableHeight || fallbackHeight));
    }
}
