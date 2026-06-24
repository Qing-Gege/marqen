// @vitest-environment happy-dom

import type Content from '../../../block/base/content';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Muya } from '../../../muya';
import { InlineFormatToolbar } from '..';

const booted: Array<{ muya: Muya; toolbar: InlineFormatToolbar }> = [];
let originalVersion: string | undefined;
let hadVersion = false;

beforeEach(() => {
    hadVersion = 'MUYA_VERSION' in window;
    originalVersion = window.MUYA_VERSION;
    window.MUYA_VERSION = 'test';
});

afterEach(() => {
    while (booted.length) {
        const { muya, toolbar } = booted.pop()!;
        toolbar.destroy();
        muya.destroy();
    }
    document.getSelection()?.removeAllRanges();
    vi.restoreAllMocks();
    if (hadVersion)
        window.MUYA_VERSION = originalVersion as string;
    else
        delete (window as Partial<Window>).MUYA_VERSION;
});

function bootMuya(markdown: string) {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const muya = new Muya(host, { markdown } as ConstructorParameters<typeof Muya>[1]);
    muya.init();
    const toolbar = new InlineFormatToolbar(muya);
    booted.push({ muya, toolbar });

    return { muya, toolbar };
}

async function nextFrame() {
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => setTimeout(resolve, 0));
}

describe('inlineFormatToolbar multi-block selection', () => {
    it('does not show or resync the inline toolbar for selections spanning blocks', async () => {
        const { muya, toolbar } = bootMuya('first paragraph\n\nsecond paragraph\n');
        const first = muya.editor.scrollPage!.firstContentInDescendant() as Content;
        const second = first.nextContentInContext()!;

        muya.editor.selection.setSelection({
            anchor: { offset: 0 },
            focus: { offset: 6 },
            anchorBlock: first,
            anchorPath: first.path,
            focusBlock: second,
            focusPath: second.path,
        });

        document.dispatchEvent(new Event('selectionchange'));
        await nextFrame();

        expect(toolbar.status).toBe(false);

        muya.domNode.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'Control',
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            }),
        );
        muya.domNode.dispatchEvent(
            new KeyboardEvent('keyup', {
                key: 'Control',
                bubbles: true,
                cancelable: true,
            }),
        );
        await nextFrame();

        expect(toolbar.status).toBe(false);
        expect(first.text).toBe('first paragraph');
        expect(second.text).toBe('second paragraph');
    });
});
