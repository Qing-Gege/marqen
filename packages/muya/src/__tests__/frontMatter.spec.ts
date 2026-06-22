// @vitest-environment happy-dom

import type Content from '../block/base/content';
import type Parent from '../block/base/parent';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Muya } from '../muya';
import { replaceBlockByLabel } from '../ui/paragraphQuickInsertMenu/config';

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
    if (hadVersion)
        window.MUYA_VERSION = originalVersion as string;
    else
        delete (window as Partial<Window>).MUYA_VERSION;
});

function bootMuya(markdown: string): Muya {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const muya = new Muya(host, { markdown });
    muya.init();
    bootedHosts.push(muya.domNode);
    return muya;
}

function placeCursorOn(muya: Muya, blockIndex: number): Content {
    const block = muya.editor.scrollPage!.find(blockIndex) as unknown as Parent;
    const content = block.firstContentInDescendant()!;
    muya.editor.activeContentBlock = content;
    return content;
}

function leafAt(muya: Muya, blockIndex: number): Parent {
    const content = placeCursorOn(muya, blockIndex);
    return (content as unknown as { parent: Parent }).parent;
}

describe('frontmatter compatibility without creation UI', () => {
    it('keeps existing frontmatter readable and serializable', () => {
        const muya = bootMuya('---\ntitle: hi\n---\n\nbody\n');

        const state = muya.getState();
        expect(state[0].name).toBe('frontmatter');
        expect(muya.getMarkdown()).toContain('title: hi');
        expect(muya.getMarkdown()).toContain('body');
    });

    it('ignores the removed paragraph command for creating frontmatter', async () => {
        const muya = bootMuya('first para\n\nsecond para\n');
        placeCursorOn(muya, 1);
        muya.updateParagraph('front-matter');

        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

        const state = muya.getState();
        expect(state.map(block => block.name)).toEqual(['paragraph', 'paragraph']);
        expect(muya.getMarkdown()).toContain('first para');
        expect(muya.getMarkdown()).toContain('second para');
    });

    it('ignores the removed quick-insert frontmatter label', async () => {
        const muya = bootMuya('first para\n\n/\n');
        const block = leafAt(muya, 1);
        replaceBlockByLabel({ block, muya, label: 'frontmatter' });

        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

        const state = muya.getState();
        expect(state.map(item => item.name)).toEqual(['paragraph', 'paragraph']);
        expect(muya.getMarkdown()).toContain('first para');
        expect(muya.getMarkdown()).toContain('/');
    });
});
