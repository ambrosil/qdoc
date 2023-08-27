/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic"

import { Alignment } from "@ckeditor/ckeditor5-alignment"
import { Autoformat } from "@ckeditor/ckeditor5-autoformat"
import { Bold, Italic, Strikethrough, Underline } from "@ckeditor/ckeditor5-basic-styles"
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services"
import { Essentials } from "@ckeditor/ckeditor5-essentials"
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from "@ckeditor/ckeditor5-font"
import { Heading } from "@ckeditor/ckeditor5-heading"
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line"
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed"
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support"
import { Image, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from "@ckeditor/ckeditor5-image"
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent"
import { List } from "@ckeditor/ckeditor5-list"
import { PageBreak } from "@ckeditor/ckeditor5-page-break"
import { Paragraph } from "@ckeditor/ckeditor5-paragraph"
//import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format"
import { StandardEditingMode } from "@ckeditor/ckeditor5-restricted-editing"
import { SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersText } from "@ckeditor/ckeditor5-special-characters"
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from "@ckeditor/ckeditor5-table"
import { TextTransformation } from "@ckeditor/ckeditor5-typing"

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
    public static override builtinPlugins = [
        Alignment,
        Autoformat,
        Bold,
        CloudServices,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        HorizontalLine,
        HtmlEmbed,
        Image,
        ImageInsert,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        List,
        PageBreak,
        Paragraph,
        //PasteFromOffice,
        RemoveFormat,
        SpecialCharacters,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersText,
        StandardEditingMode,
        Strikethrough,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        Underline
    ]

    public static override defaultConfig = {
        toolbar: {
            items: ["heading", "|", "bold", "italic", "underline", "strikethrough", "bulletedList", "numberedList", "|", "outdent", "indent", "insertTable", "alignment", "fontBackgroundColor", "fontColor", "fontFamily", "fontSize", "|", "htmlEmbed", "pageBreak", "removeFormat", "specialCharacters", "horizontalLine", "imageInsert"]
        },
        language: "it",
        image: {
            toolbar: ["imageTextAlternative", "imageStyle:inline", "imageStyle:block", "imageStyle:side"]
        },
        table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"]
        }
    }
}

export default Editor
