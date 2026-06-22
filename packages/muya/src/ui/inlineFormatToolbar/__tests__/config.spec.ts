import { describe, expect, it } from 'vitest';
import icons from '../config';

// Defensive lock for the non-technical default toolbar surface. The toolbar
// reads `config.ts` and renders one button per entry, so a regression here
// would silently expose or remove user-visible controls.
//
// Kept narrow: we do not lock tooltip/shortcut text (which is i18n /
// platform-dependent) or the `image`/`clear` entries (which are out of
// scope for the highlight + underline backports).

const REQUIRED_TYPES = [
    'strong',
    'em',
    'u',
    'del',
    'mark',
    'link',
] as const;

describe('inlineFormatToolbar config — required inline format types', () => {
    it('exports an array of icon entries', () => {
        expect(Array.isArray(icons)).toBe(true);
        expect(icons.length).toBeGreaterThanOrEqual(REQUIRED_TYPES.length);
    });

    it.each(REQUIRED_TYPES)('contains an entry for type %s with an icon', (type) => {
        const entry = icons.find(i => i.type === type);
        expect(entry, `missing config entry for type=${type}`).toBeTruthy();
        expect(entry!.icon, `type=${type} entry has no icon`).toBeTruthy();
    });

    it('does not duplicate any required type', () => {
        for (const type of REQUIRED_TYPES) {
            const matches = icons.filter(i => i.type === type);
            expect(matches.length, `type=${type} appears ${matches.length} times`).toBe(1);
        }
    });

    it('does not expose formula as a default toolbar button', () => {
        expect(icons.some(i => i.type === 'inline_math')).toBe(false);
    });

    it('does not expose code as a default toolbar button', () => {
        expect(icons.some(i => i.type === 'inline_code')).toBe(false);
    });
});
