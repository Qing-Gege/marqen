import { describe, expect, it } from 'vitest';
import Format from '../format';

// Regression coverage for inline format cursor placement. Collapsed selections
// still create a format run and leave the caret inside it. Non-empty selections
// keep the visible text selected after formatting so toolbar clicks can toggle
// the same range repeatedly without leaking raw markers into the document.
//
// `Format.prototype._addFormat` is the small text-rewriter that:
//   1. Wraps `text[start..end]` with the format's opening + closing
//      markers.
//   2. Adjusts `start.offset` / `end.offset` so the public `format()` call
//      can `setCursor(start, end, true)` afterwards.
//
// `_addFormat` only reads/writes `this.text`, so a structurally-typed
// fake `this` is enough — no Muya bootstrap needed.

interface IOffset {
    offset: number;
}

// `_addFormat` is declared private on Format, so accessing it via the
// prototype requires bypassing visibility — this structural type captures
// the signature the helper here actually invokes.
interface FormatProtoAddFormat {
    _addFormat: (
        this: { text: string },
        type: string,
        cursor: { start: IOffset; end: IOffset },
    ) => void;
}

function applyAddFormat(text: string, start: number, end: number, type: string) {
    const fakeThis = { text } as { text: string };
    const startOffset: IOffset = { offset: start };
    const endOffset: IOffset = { offset: end };
    (Format.prototype as unknown as FormatProtoAddFormat)._addFormat.call(fakeThis, type, {
        start: startOffset,
        end: endOffset,
    });
    return { text: fakeThis.text, start: startOffset.offset, end: endOffset.offset };
}

describe('format._addFormat cursor placement', () => {
    describe('html-tag markers — non-empty selection stays selected inside the tags', () => {
        it('strong: "abc" -> "<strong>abc</strong>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'strong');
            expect(text).toBe('<strong>abc</strong>');
            expect(start).toBe(8);
            expect(end).toBe(11);
        });

        it('em: "abc" -> "<em>abc</em>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'em');
            expect(text).toBe('<em>abc</em>');
            expect(start).toBe(4);
            expect(end).toBe(7);
        });

        it('inline_code: "abc" -> "<code>abc</code>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'inline_code');
            expect(text).toBe('<code>abc</code>');
            expect(start).toBe(6);
            expect(end).toBe(9);
        });

        it('del: "abc" -> "<s>abc</s>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'del');
            expect(text).toBe('<s>abc</s>');
            expect(start).toBe(3);
            expect(end).toBe(6);
        });

        it('inline_math (`$`): "abc" -> "$abc$" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'inline_math');
            expect(text).toBe('$abc$');
            expect(start).toBe(1);
            expect(end).toBe(4);
        });

        it('mid-text selection: "hello world" select "world" -> keeps "world" selected', () => {
            const { text, start, end } = applyAddFormat('hello world', 6, 11, 'strong');
            expect(text).toBe('hello <strong>world</strong>');
            expect(start).toBe(14);
            expect(end).toBe(19);
        });

        it('u (`<u>...</u>`): "abc" -> "<u>abc</u>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'u');
            expect(text).toBe('<u>abc</u>');
            expect(start).toBe(3);
            expect(end).toBe(6);
        });

        it('sub: "abc" -> "<sub>abc</sub>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'sub');
            expect(text).toBe('<sub>abc</sub>');
            expect(start).toBe(5);
            expect(end).toBe(8);
        });

        it('sup: "abc" -> "<sup>abc</sup>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'sup');
            expect(text).toBe('<sup>abc</sup>');
            expect(start).toBe(5);
            expect(end).toBe(8);
        });

        it('mark: "abc" -> "<mark>abc</mark>" with text still selected', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'mark');
            expect(text).toBe('<mark>abc</mark>');
            expect(start).toBe(6);
            expect(end).toBe(9);
        });
    });

    describe('collapsed selection (start === end) — caret BETWEEN markers so user can type into the format', () => {
        it('strong (collapsed at offset 3 in "abcdef"): caret stays inside the tag run', () => {
            const { text, start, end } = applyAddFormat('abcdef', 3, 3, 'strong');
            expect(text).toBe('abc<strong></strong>def');
            expect(start).toBe(11);
            expect(end).toBe(11);
        });

        it('em (collapsed at offset 0 in ""): caret stays inside the tag run', () => {
            const { text, start, end } = applyAddFormat('', 0, 0, 'em');
            expect(text).toBe('<em></em>');
            expect(start).toBe(4);
            expect(end).toBe(4);
        });

        it('inline_code (collapsed at offset 0 in ""): caret stays inside the tag run', () => {
            const { text, start, end } = applyAddFormat('', 0, 0, 'inline_code');
            expect(text).toBe('<code></code>');
            expect(start).toBe(6);
            expect(end).toBe(6);
        });

        it('u (collapsed at offset 2 in "ab"): caret between `<u>` and `</u>` (offset 5)', () => {
            const { text, start, end } = applyAddFormat('ab', 2, 2, 'u');
            expect(text).toBe('ab<u></u>');
            expect(start).toBe(5);
            expect(end).toBe(5);
        });

        it('mark (collapsed at offset 0 in ""): caret between `<mark>` and `</mark>` (offset 6)', () => {
            const { text, start, end } = applyAddFormat('', 0, 0, 'mark');
            expect(text).toBe('<mark></mark>');
            expect(start).toBe(6);
            expect(end).toBe(6);
        });
    });

    describe('link / image — preserve existing caret-inside-`()` behavior (unchanged)', () => {
        it('link: "abc" -> "[abc]()" with caret between `(` and `)` (offset 6)', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'link');
            expect(text).toBe('[abc]()');
            expect(start).toBe(6);
            expect(end).toBe(6);
        });

        it('image: "abc" -> "![abc]()" with caret between `(` and `)` (offset 7)', () => {
            const { text, start, end } = applyAddFormat('abc', 0, 3, 'image');
            expect(text).toBe('![abc]()');
            expect(start).toBe(7);
            expect(end).toBe(7);
        });
    });
});
