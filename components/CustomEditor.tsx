import CustomEditor from "@/ckeditor-custom-build"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import React from "react"

const Editor = ({ value, onChange }) => {
    return (
        <CKEditor
            editor={CustomEditor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData()
                onChange(data)
            }}
        />
    )
}

export default Editor
