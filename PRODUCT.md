# Product

## Register

product

## Users

Marqen is for non-programmer document writers: people writing tutorials, notes, product docs, instructions, plans, handoff documents, and articles. They think in ordinary documents, not Markdown files, paths, syntax compatibility, Git workflows, or source/preview models.

They often expect Word-like direct manipulation: open a document, write, insert images, insert tables, export or share. When the document contains advanced structures such as formulas, they need those structures to display correctly, but they should not be forced to understand LaTeX, Markdown syntax, asset paths, or implementation details.

## Product Purpose

Marqen is a lightweight local document editor that makes structured documents feel simple, clean, and hard to mess up. Markdown can remain the internal format, but it should not be the user's mental model.

Success means a first-time user can write a polished document, insert images and tables, keep formatting consistent, and export or share the result without learning Markdown concepts or managing resource folders.

## Brand Personality

Calm, direct, trustworthy.

The product should feel like a focused writing tool with automatic layout discipline: lighter and cleaner than Word, less technical than Markdown editors, and more predictable than free-form rich text editors.

## Anti-references

- Programmer-first Markdown editors that foreground source mode, syntax names, GFM/CommonMark compatibility, front matter, code fences, file paths, and split preview.
- Word-style formatting overload where users can easily create inconsistent visual chaos.
- Developer tooling inside ordinary menus, such as visible reload/devtools affordances.
- File-manager metaphors that expose asset folders and implementation structure to ordinary users.
- Feature-heavy preference panels that read like an engineer's configuration surface rather than a document tool.

## Design Principles

1. Hide the implementation model. Markdown, paths, assets, and compatibility should stay behind the curtain unless a user explicitly chooses an advanced mode.
2. Name actions by user intent. Use labels like "Picture", "Table", "Export PDF", and "Writing Guide", not syntax or format jargon.
3. Make the document the center. The primary screen should feel like writing a document, with supporting controls staying quiet and predictable.
4. Prefer fewer, clearer entry points. Remove rarely needed technical features from default UI before adding new options.
5. Keep output confidence high. Users should trust that what they see is what they can export, print, or send.

## Accessibility & Inclusion

Target WCAG AA for text contrast, focus visibility, keyboard access, and reduced-motion behavior. The interface should support Chinese and English by default and continue to follow system language preferences. Copy should avoid technical assumptions and remain understandable for users unfamiliar with Markdown or local file resource management.
