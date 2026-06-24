// @vitest-environment happy-dom

import type Format from '../../block/base/format';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Muya } from '../../muya';

const bootedHosts: HTMLElement[] = [];
let originalVersion: string | undefined;
let hadVersion = false;

beforeEach(() => {
    hadVersion = 'MUYA_VERSION' in window;
    originalVersion = window.MUYA_VERSION;
    window.MUYA_VERSION = 'test';
});

afterEach(() => {
    while (bootedHosts.length) {
        const host = bootedHosts.pop()!;
        host.remove();
    }
    document.getSelection()?.removeAllRanges();
    if (hadVersion)
        window.MUYA_VERSION = originalVersion as string;
    else
        delete (window as Partial<Window>).MUYA_VERSION;
});

function bootMuya(markdown: string): Muya {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const muya = new Muya(host, { markdown } as ConstructorParameters<typeof Muya>[1]);
    muya.init();
    bootedHosts.push(muya.domNode);
    return muya;
}

describe('editor modifier key dispatch', () => {
    it('does not route pure Control keydown/keyup into the selected content block', () => {
        const muya = bootMuya('hello world\n');
        const content = muya.editor.scrollPage!.firstContentInDescendant() as unknown as Format;

        muya.editor.selection.setSelection({
            anchor: { offset: 0 },
            focus: { offset: 5 },
            block: content,
            path: content.path,
        });

        const keydown = vi.spyOn(content, 'keydownHandler');
        const keyup = vi.spyOn(content, 'keyupHandler');

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

        expect(keydown).not.toHaveBeenCalled();
        expect(keyup).not.toHaveBeenCalled();
        expect(content.text).toBe('hello world');
    });
});
