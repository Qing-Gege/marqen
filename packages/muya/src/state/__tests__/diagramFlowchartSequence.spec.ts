import { describe, expect, it } from 'vitest';
import { MarkdownToState } from '../markdownToState';
import ExportMarkdown from '../stateToMarkdown';

// Loose accessor type used only in this spec — every state node the
// MarkdownToState pipeline emits has some subset of these fields, and the
// tests navigate the tree generically without re-implementing the
// discriminated TState union narrowing.
interface IStateLike {
    name: string;
    text?: string;
    meta?: Record<string, unknown> & { type?: string; lang?: string };
    children?: IStateLike[];
}

function generate(markdown: string): IStateLike[] {
    return new MarkdownToState({
        footnote: false,
        math: false,
        isGitlabCompatibilityEnabled: false,
        trimUnnecessaryCodeBlockEmptyLines: false,
        frontMatter: false,
    }).generate(markdown) as unknown as IStateLike[];
}

function toMarkdown(states: IStateLike[]): string {
    return new ExportMarkdown({ listIndentation: 1 }).generate(
        states as unknown as Parameters<ExportMarkdown['generate']>[0],
    );
}

describe('technical diagram fences', () => {
    it.each(['flowchart', 'sequence', 'mermaid', 'plantuml', 'vega-lite'])(
        'keeps ```%s``` as an editable code block',
        (lang) => {
            const md = `\`\`\`${lang}
st=>start: Start
e=>end: End
st->e
\`\`\`
`;
            const states = generate(md);

            expect(states.length).toBe(1);
            expect(states[0].name).toBe('code-block');
            expect(states[0].meta!.lang).toBe(lang);
            expect(states[0].text).toContain('st=>start: Start');
        },
    );

    it('round-trips technical fences without enabling diagram rendering', () => {
        const md = `\`\`\`sequence
Alice->Bob: Hello Bob
Bob-->Alice: Hi Alice
\`\`\`
`;
        const out = toMarkdown(generate(md));
        expect(out).toContain('```sequence');
        expect(out).toContain('Alice->Bob: Hello Bob');
        expect(out).toContain('Bob-->Alice: Hi Alice');
    });
});
