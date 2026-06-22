// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';
import { normalizePastedHTML } from '../paste';

function getTextContent(html: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    return wrapper.textContent || '';
}

describe('normalizePastedHTML', () => {
    it('strips Word/Office clipboard style preamble from partial HTML fragments', async () => {
        const html = `<title></title><style>
@font-face{
font-family:"Times New Roman";
}
@font-face{
font-family:"宋体";
}
@list l0:level1{
mso-level-start-at:2;
mso-level-number-format:alpha-lower;
mso-level-suffix:tab;
mso-level-text:"%1.";
mso-level-tab-stop:none;
mso-level-number-position:left;
margin-left:0.0000pt;
text-indent:0.0000pt;
font-family:'Times New Roman';color:rgb(51,112,255);}
p.MsoNormal{
mso-style-name:正文;
margin:0pt;
font-family:'Times New Roman';
font-size:10.5000pt;
}
@page{mso-page-border-surround-header:no;
 mso-page-border-surround-footer:no;}
</style>

a.&nbsp;人力支持：需要3名左右正式员工以及3-6名实习生，共同将WBT基座能力和应用能力推向新的台阶<br>
b.&nbsp;算力支持：后期Generator训练可能需要较大算力，需要根据项目进展动态调整算力需求`;

        const normalized = await normalizePastedHTML(html);
        const text = getTextContent(normalized);

        expect(normalized).not.toMatch(/<style|<title|mso-|@font-face|@list|@page|MsoNormal/i);
        expect(text).toContain('a.\u00a0人力支持');
        expect(text).toContain('b.\u00a0算力支持');
    });

    it('extracts body content from full HTML documents with body attributes', async () => {
        const normalized = await normalizePastedHTML(
            '<html><head><title>hidden</title></head><body class="doc"><p>visible</p></body></html>',
        );

        expect(normalized).toBe('<p>visible</p>');
    });
});
