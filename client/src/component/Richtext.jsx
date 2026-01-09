import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

function Richtext({value , onChange}) {
    const editor = useEditor({
        extension: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            })
        ],
        content: value || "<p></p>",
        onUpdate({editor}) {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class:
                    "wordlite-editor"
            }
        }
    })
    useEffect(() => {

        if (!editor) return;
        const current = editor.getHTML();
        const next = value || "<p></p>";
        if (current !== next) {
            editor.commands.setContent(next, false);
        }
    }, [value, editor]);

    if (!editor) return null;
    const btnClass = (active) => `btn btn-sm ${active ? "btn-dark" : "btn-outline-dark"}`;
    return (
        <div className="border rounded p-2 bg-white">
            <div className="d-flex flex-wrap gap-2 mb-2">
                <button
                    type="button"
                    className={btnClass(editor.isActive("bond"))}
                    onClick={() => editor.chain().focus.toggleBold().run()}>
                    B
                </button>
                <button
                    type="button"
                    className={btnClass(editor.isActive("italic"))}
                    onClick={()=> editor.chain().focus().toggleItalic().run()}
                >
                    I
                </button>
                <button
                type="button"
                className={btnClass(editor.isActive("underline"))}
                onClick={()=> editor.chain().focus().toggleUnderline().run()}>
                        U
                </button>
                <div className="vr" />
                <button
                    type="button"
                    className={btnClass(editor.isActive("heading"),{level: 2})}
                    onClick={()=> editor.chain().focus().toggleHeading({level: 2 }).run()}
                >
                    H2
                </button>
                <div className="vr" />
                <button
                type="button"
                className={btnClass(editor.isActive("bulletList"))}
                onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    • <List></List>
                </button>
                <button
                type="button"
                className={btnClass(editor.isActive("orderedList"))}
                onClick={()=> editor.chain().focus().toggleOrderedList().run()}>
                    1.List
                </button>
                <div className="vr" />
                <button
                type="button"
                className={btnClass(editor.isActive({textAlign: "left"}))}
                onClick={()=> editor.chain().focus().setTextAlign("left").run()}>
                    ⬅
                </button>
                <button
                type="button"
                className={btnClass(editor.isActive({textAlign: "center"}))}
                onClick={()=> editor.chain().focus().setTextAlign("center").run()}>
                    ⬍
                </button>
                <button
                type="button"
                className={btnClass(editor.isActive({textAlign: "right"}))}
                onClick={()=> editor.chain().focus().setTextAlign("right").run()}>

                </button>
                <div className="vr" />
                <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                disabled={!editor.can().undo()}
                onClick={()=> editor.chain().focus().undo().run()}>
                    Undo
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    disabled={!editor.can().redo()}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    Redo
                </button>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
export default Richtext