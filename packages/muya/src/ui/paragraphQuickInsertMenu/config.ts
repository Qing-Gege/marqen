import type Parent from '../../block/base/parent';
import type { Muya } from '../../index';
import bulletListIcon from '../../assets/icons/bullet_list/2.png';
import header1Icon from '../../assets/icons/heading_1/2.png';
import header2Icon from '../../assets/icons/heading_2/2.png';
import header3Icon from '../../assets/icons/heading_3/2.png';
import hrIcon from '../../assets/icons/horizontal_line/2.png';
import newTableIcon from '../../assets/icons/new_table/2.png';
import orderListIcon from '../../assets/icons/order_list/2.png';
import paragraphIcon from '../../assets/icons/paragraph/2.png';
import quoteIcon from '../../assets/icons/quote_block/2.png';

import todoListIcon from '../../assets/icons/todolist/2.png';
import { ScrollPage } from '../../block/scrollPage';
import { isOsx } from '../../config';

import emptyStates from '../../config/emptyStates';
import { getCursorReference } from '../../selection';
import { isParagraphState } from '../../state/types';
import { deepClone, isKeyboardEvent } from '../../utils';
import logger from '../../utils/logger';

const debug = logger('quickInsert:');

const COMMAND_KEY = isOsx ? '⌘' : 'Ctrl';
const OPTION_KEY = isOsx ? '⌥' : 'Alt';
const SHIFT_KEY = isOsx ? '⇧' : 'Shift';

// Command (or Cmd) ⌘
// Shift ⇧
// Option (or Alt) ⌥
// Control (or Ctrl) ⌃
// Caps Lock ⇪
// Fn

export interface IQuickInsertMenuItem {
    name: string;
    children: {
        title: string;
        subTitle: string;
        label: string;
        icon: string;
        score?: number;
        i18nTitle?: string;
        shortCut?: string;
        shortKeyMap?: {
            altKey: boolean;
            shiftKey: boolean;
            metaKey: boolean;
            code: string;
        };
    }[];
}

export const MENU_CONFIG: IQuickInsertMenuItem[] = [
    {
        name: 'common',
        children: [
            {
                title: 'Normal text',
                subTitle: 'Body text',
                label: 'paragraph',
                shortCut: `${COMMAND_KEY}+0`,
                shortKeyMap: {
                    altKey: false,
                    shiftKey: false,
                    metaKey: true,
                    code: 'Digit0',
                },
                icon: paragraphIcon,
            },
            {
                title: 'Divider',
                subTitle: 'Separate sections',
                label: 'thematic-break',
                shortCut: `${OPTION_KEY}+${COMMAND_KEY}+-`,
                shortKeyMap: {
                    altKey: true,
                    shiftKey: false,
                    metaKey: true,
                    code: 'Minus',
                },
                icon: hrIcon,
            },
        ],
    },
    {
        name: 'headings',
        children: [
            {
                title: 'Heading 1',
                subTitle: 'Large section title',
                label: 'atx-heading 1',
                shortCut: `${COMMAND_KEY}+1`,
                shortKeyMap: {
                    altKey: false,
                    shiftKey: false,
                    metaKey: true,
                    code: 'Digit1',
                },
                icon: header1Icon,
            },
            {
                title: 'Heading 2',
                subTitle: 'Section title',
                label: 'atx-heading 2',
                shortCut: `${COMMAND_KEY}+2`,
                shortKeyMap: {
                    altKey: false,
                    shiftKey: false,
                    metaKey: true,
                    code: 'Digit2',
                },
                icon: header2Icon,
            },
            {
                title: 'Heading 3',
                subTitle: 'Small section title',
                label: 'atx-heading 3',
                shortCut: `${COMMAND_KEY}+3`,
                shortKeyMap: {
                    altKey: false,
                    shiftKey: false,
                    metaKey: true,
                    code: 'Digit3',
                },
                icon: header3Icon,
            },
        ],
    },
    {
        name: 'content',
        children: [
            {
                title: 'Table',
                subTitle: 'Rows and columns',
                label: 'table',
                // no
                shortCut: `${SHIFT_KEY}+${COMMAND_KEY}+T`,
                shortKeyMap: {
                    altKey: false,
                    shiftKey: true,
                    metaKey: true,
                    code: 'KeyT',
                },
                icon: newTableIcon,
            },
            {
                title: 'Quote',
                subTitle: 'Quoted text',
                label: 'block-quote',
                // no
                shortCut: `${OPTION_KEY}+${COMMAND_KEY}+Q`,
                shortKeyMap: {
                    altKey: true,
                    shiftKey: false,
                    metaKey: true,
                    code: 'KeyQ',
                },
                icon: quoteIcon,
            },
        ],
    },
    {
        name: 'lists',
        children: [
            {
                title: 'Numbered list',
                subTitle: 'Steps in order',
                label: 'order-list',
                shortCut: `${OPTION_KEY}+${COMMAND_KEY}+O`,
                shortKeyMap: {
                    altKey: true,
                    shiftKey: false,
                    metaKey: true,
                    code: 'KeyO',
                },
                icon: orderListIcon,
            },
            {
                title: 'Bulleted list',
                subTitle: 'Simple list',
                label: 'bullet-list',
                shortCut: `${OPTION_KEY}+${COMMAND_KEY}+U`,
                shortKeyMap: {
                    altKey: true,
                    shiftKey: false,
                    metaKey: true,
                    code: 'KeyU',
                },
                icon: bulletListIcon,
            },
            {
                title: 'Checklist',
                subTitle: 'Track tasks',
                label: 'task-list',
                shortCut: `${OPTION_KEY}+${COMMAND_KEY}+X`,
                shortKeyMap: {
                    altKey: true,
                    shiftKey: false,
                    metaKey: true,
                    code: 'KeyX',
                },
                icon: todoListIcon,
            },
        ],
    },
];

export function getLabelFromEvent(event: Event) {
    if (!isKeyboardEvent(event))
        return null;
    const ALL_MENU_CONFIG = MENU_CONFIG.reduce(
        (acc, section) => [...acc, ...section.children],
        [] as IQuickInsertMenuItem['children'],
    );

    const result = ALL_MENU_CONFIG.find((menu) => {
        const { code, metaKey, shiftKey, altKey } = event;
        const { shortKeyMap = {} as IQuickInsertMenuItem['children'][number]['shortKeyMap'] } = menu;

        return (
            code === shortKeyMap?.code
            && metaKey === shortKeyMap.metaKey
            && shiftKey === shortKeyMap.shiftKey
            && altKey === shortKeyMap.altKey
        );
    });

    if (result)
        return result.label;
}

/**
 * Show the in-editor table grid picker. The in-editor "table" insert (the `/`
 * quick-insert menu and the paragraph front-menu) must offer a hover-grid
 * dimension picker rather than dropping a fixed-size table — the picker UI
 * (`TableChessboard`) subscribes to `muya-table-picker` and invokes the
 * dispatched callback with the zero-based `(row, column)` the user picked, so
 * the table is created at `row + 1 × column + 1` to match legacy semantics.
 *
 * The float anchors to the caret (`getCursorReference`); when the cursor has
 * no coords (e.g. the front-menu took focus) it falls back to the block's DOM
 * node. No-op if neither is available.
 */
export function showTablePicker(muya: Muya, block: Parent) {
    const { eventCenter } = muya;
    const reference = getCursorReference() ?? block.domNode;
    if (!reference)
        return;

    const handler = (row: number, column: number) => {
        muya.createTable({ rows: row + 1, columns: column + 1 });
    };

    eventCenter.emit('muya-table-picker', { row: -1, column: -1 }, reference, handler);
}

export function replaceBlockByLabel({ block, muya, label, text = '' }: {
    block: Parent;
    muya: Muya;
    label: string;
    text?: string;
}) {
    const {
        preferLooseListItem,
        bulletListMarker,
        orderListDelimiter,
    } = muya.options;
    let newBlock = null;
    let state = null;
    let cursorBlock = null;

    // The in-editor "table" insert shows a hover-grid dimension picker
    // instead of dropping a fixed-size
    // table. The picker's callback creates the table at the chosen size, so
    // bail before the in-place empty-table replacement below.
    if (label === 'table') {
        showTablePicker(muya, block);
        return;
    }

    switch (label) {
        case 'paragraph':
            // fall through
        case 'thematic-break':
            // fall through
        case 'math-block':
            // fall through
        case 'block-quote': {
            const cloned = deepClone(emptyStates[label]);
            if (cloned.name === 'paragraph') {
                cloned.text = text;
            }
            else if (cloned.name === 'block-quote') {
                const inner = cloned.children[0];
                if (isParagraphState(inner))
                    inner.text = text;
            }
            state = cloned;
            newBlock = ScrollPage.loadBlock(label).create(muya, state);
            break;
        }

        case 'atx-heading 1':
            // fall through
        case 'atx-heading 2':
            // fall through
        case 'atx-heading 3': {
            const headingState = deepClone(emptyStates['atx-heading']);

            const [blockName, level] = label.split(' ');
            headingState.meta.level = +level;
            headingState.text = `${'#'.repeat(+level)} ${text}`;
            state = headingState;
            newBlock = ScrollPage.loadBlock(blockName).create(muya, state);
            break;
        }

        case 'order-list': {
            const orderState = deepClone(emptyStates[label]);
            orderState.meta.loose = preferLooseListItem;
            orderState.meta.delimiter = orderListDelimiter;
            const firstChild = orderState.children[0].children[0];
            if (text && isParagraphState(firstChild))
                firstChild.text = text;

            state = orderState;
            newBlock = ScrollPage.loadBlock(label).create(muya, state);
            break;
        }

        case 'bullet-list':
            // fall through
        case 'task-list': {
            const listState = deepClone(emptyStates[label]);
            listState.meta.loose = preferLooseListItem;
            listState.meta.marker = bulletListMarker;
            const firstChild = listState.children[0].children[0];
            if (text && isParagraphState(firstChild))
                firstChild.text = text;

            state = listState;
            newBlock = ScrollPage.loadBlock(label).create(muya, state);
            break;
        }

        default:
            debug.log('Unknown label in quick insert');
            return;
    }

    block.replaceWith(newBlock);
    if (label === 'thematic-break') {
        const nextParagraphBlock = ScrollPage.loadBlock('paragraph').create(
            muya,
            deepClone(emptyStates.paragraph),
        );
        newBlock.parent.insertAfter(nextParagraphBlock, newBlock);
        cursorBlock = nextParagraphBlock.firstContentInDescendant();
        cursorBlock.setCursor(0, 0, true);
    }
    else {
        cursorBlock = newBlock.firstContentInDescendant();
        cursorBlock.setCursor(cursorBlock.text.length, cursorBlock.text.length, true);
    }
}
