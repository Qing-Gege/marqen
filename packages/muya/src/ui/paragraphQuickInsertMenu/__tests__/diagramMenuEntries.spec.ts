import { describe, expect, it } from 'vitest';
import { MENU_CONFIG } from '../config';

describe('quick-insert menu — non-technical default entries', () => {
    const labels = MENU_CONFIG.flatMap(section => section.children.map(child => child.label));

    it.each([
        'frontmatter',
        'html-block',
        'code-block',
        'math-block',
        'diagram flowchart',
        'diagram sequence',
        'diagram mermaid',
        'diagram plantuml',
        'diagram vega-lite',
    ])('does not expose %s in the default quick-insert menu', (label) => {
        expect(labels).not.toContain(label);
    });
});
