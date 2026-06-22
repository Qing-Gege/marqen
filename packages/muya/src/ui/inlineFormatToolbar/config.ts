import clearIcon from '../../assets/icons/format_clear/2.png';
import emphasisIcon from '../../assets/icons/format_emphasis/2.png';
import linkIcon from '../../assets/icons/format_link/2.png';
import bulletListIcon from '../../assets/icons/bullet_list/2.png';
import orderListIcon from '../../assets/icons/order_list/2.png';
import paragraphIcon from '../../assets/icons/paragraph/2.png';
import quoteIcon from '../../assets/icons/quote_block/2.png';
import strikeIcon from '../../assets/icons/format_strike/2.png';
import strongIcon from '../../assets/icons/format_strong/2.png';
import todoListIcon from '../../assets/icons/todolist/2.png';
import underlineIcon from '../../assets/icons/format_underline/2.png';
import highlightIcon from '../../assets/icons/highlight/2.png';
import { isOsx } from '../../config';

const COMMAND_KEY = isOsx ? '⌘' : 'Ctrl';
const WORD_HEADING_KEY = isOsx ? '⌘⌥' : 'Ctrl+Alt';
const NORMAL_TEXT_KEY = isOsx ? '⌘⌥0' : 'Ctrl+Shift+N';

export interface ParagraphStyle {
    type: string;
    label: string;
    shortLabel: string;
    command: string;
    icon?: string;
    shortcut?: string;
}

export interface FormatToolIcon {
    type: string;
    tooltip: string;
    shortcut: string;
    icon?: string;
    label?: string;
}

export const paragraphStyles: ParagraphStyle[] = [
    {
        type: 'paragraph',
        label: 'Normal text',
        shortLabel: 'T',
        command: 'paragraph',
        icon: paragraphIcon,
        shortcut: NORMAL_TEXT_KEY,
    },
    {
        type: 'heading-1',
        label: 'Heading 1',
        shortLabel: 'H1',
        command: 'heading 1',
        shortcut: `${WORD_HEADING_KEY}+1`,
    },
    {
        type: 'heading-2',
        label: 'Heading 2',
        shortLabel: 'H2',
        command: 'heading 2',
        shortcut: `${WORD_HEADING_KEY}+2`,
    },
    {
        type: 'heading-3',
        label: 'Heading 3',
        shortLabel: 'H3',
        command: 'heading 3',
        shortcut: `${WORD_HEADING_KEY}+3`,
    },
    {
        type: 'order-list',
        label: 'Numbered list',
        shortLabel: '1.',
        command: 'ol-order',
        icon: orderListIcon,
    },
    {
        type: 'bullet-list',
        label: 'Bulleted list',
        shortLabel: '-',
        command: 'ul-bullet',
        icon: bulletListIcon,
        shortcut: `${COMMAND_KEY}+⇧+L`,
    },
    {
        type: 'task-list',
        label: 'Checklist',
        shortLabel: '[]',
        command: 'ul-task',
        icon: todoListIcon,
    },
    {
        type: 'quote-block',
        label: 'Quote',
        shortLabel: 'Q',
        command: 'blockquote',
        icon: quoteIcon,
    },
];

const icons = [
    {
        type: 'strong',
        tooltip: 'Bold',
        shortcut: `${COMMAND_KEY}+B`,
        icon: strongIcon,
    },
    {
        type: 'em',
        tooltip: 'Italic',
        shortcut: `${COMMAND_KEY}+I`,
        icon: emphasisIcon,
    },
    {
        type: 'u',
        tooltip: 'Underline',
        shortcut: `${COMMAND_KEY}+U`,
        icon: underlineIcon,
    },
    {
        type: 'sup',
        tooltip: 'Superscript',
        shortcut: `${COMMAND_KEY}+⇧+=`,
        label: 'x²',
    },
    {
        type: 'sub',
        tooltip: 'Subscript',
        shortcut: `${COMMAND_KEY}+=`,
        label: 'x₂',
    },
    {
        type: 'del',
        tooltip: 'Strikethrough',
        shortcut: `⇧+${COMMAND_KEY}+X`,
        icon: strikeIcon,
    },
    {
        type: 'mark',
        tooltip: 'Highlight',
        shortcut: `⇧+${COMMAND_KEY}+H`,
        icon: highlightIcon,
    },
    {
        type: 'quote-block',
        tooltip: '引用',
        shortcut: `${COMMAND_KEY}+⇧+Q`,
        icon: quoteIcon,
    },
    {
        type: 'link',
        tooltip: 'Link',
        shortcut: `${COMMAND_KEY}+K`,
        icon: linkIcon,
    },
    {
        type: 'clear',
        tooltip: 'Clear formatting',
        shortcut: `${COMMAND_KEY}+Space`,
        icon: clearIcon,
    },
];

export default icons;
