"use client"

import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Button} from "@nextui-org/button";
import axios from "axios";

export default function TinyMCE() {
    const editorRef = useRef<any>(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const onSalva = async () => {
        const html = editorRef.current.getContent();
        const res = await axios.post("/api/items", {html, name: "prova"});
        console.log(res)
    }

    return (
        <>
            <div className={"bg-amber-500 w-full space-x-2 mb-2 text-right"}>
                <Button color={"primary"} onClick={onSalva} className={"w-2"}>Salva</Button>
                <Button color={"primary"}>Chiudi</Button>
            </div>

            <Editor
                apiKey='hxqihwy733qwulo34m24n4qb9jy8xc84440lzwzvnglf267k'
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    height: "1000",
                    menubar: true,
                    content_css: "document",
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'pagebreak',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | pagebreak blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; width: 21cm; height: 29.7cm; padding: 1.9cm; }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}