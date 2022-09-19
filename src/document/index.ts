let data = ` # Welcome to Writage!

Writage is a plugin for Microsoft Word, which enables you to create and edit Markdown files (with .md extension) in convenient visual interface. It can also save your .docx files in plain text format with Markdown markup.

The option of copying selected rich-text as Markdown, and pasting Markdown as rich-text is also supported.

This document shows Markdown markup styles supported in Writage. Please feel free to edit it—a fresh copy is always available via Writage menu.

## Inline Formatting

To apply *emphasis* or **strong emphasis** please select some text and press Italic button (use Ctrl+I shortcut) or Bold button (Ctrl+B) in Word. Press again to turn it off.

## Footnotes

Notes can be placed anywhere[^1] in the document, press **References/Insert Footnote** (or Alt+Ctrl+F) to insert one. Footnotes are displayed at the bottom of the corresponding page.

[^1]: Yes, right here.

## Quotes

To style some text as a quote apply style “Quote” from the styles. Quotes are displayed inside the document with the left margin. `;

export default data;