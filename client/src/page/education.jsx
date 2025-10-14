import {useState,useEffect} from "react";
import api from "../api/axios.js"
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
function education() {
        const [isSaving,setisSaving] = useState(false)
        const [loading, setloading] = useState(true)
        const [error,seterror] = useState(null)
        const editor = useEditor({
            extensions:[
                StarterKit.configure({
                    bulletList: true,
                    orderedList: true
                }),Underline,TextAlign.configure({
                    types:["heading","paragraph"]
                })
            ],
            content: "<p>Loading...</p>",
        })
        useEffect(()=>{

            (async ()=>{
                try {

                    const {data} = await api.get("/profiles/main")
                    if(data?.doc){
                        editor?.commands.setContent(data.doc)
                    }else if(data?.html){
                        editor?.commands.setContent(data.html)
                    }else {
                        editor?.commands.clearContent();
                    }
                }catch (e){
                    seterror(e.message)
                }finally {
                    setloading(false)
                }
            })()
        },[editor])
        // if(loading){
        //     return <div>Loading</div>
        // }
        // if(error){
        //     return  <div>Error: {error}</div>
        // }
    const id = localStorage.getItem("user")
    const storageObject = JSON.parse(id)
    const handleSave = async () => {
        if (!editor) return;
        setisSaving(true);
        try {
            const payload = {
                id: storageObject.id,
                html: editor.getHTML(),
                doc: editor.getJSON(),
            };
            await api.post("/profiles/main/edit", payload);
            alert("บันทึกสำเร็จ");
        } catch (e) {
            console.error("Save error:", e);
            alert("บันทึกไม่สำเร็จ");
        } finally {
            setisSaving(false);
        }
    };

    return(
        <div className="container py-3" style={{ maxWidth: 900 }}>

            <div className="btn-group mb-2" role="group">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <b>B</b>
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <i>I</i>
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline"
                >
                    <u>U</u>
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    • List
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Numbered List"
                >
                    1. List
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    title="Align Left"
                >
                    ⬅
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    title="Align Center"
                >
                    ⬇
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    title="Align Right"
                >
                    ➡
                </button>
            </div>


            <div className="border rounded p-2" style={{ minHeight: 220 }}>
                <EditorContent editor={editor} />
            </div>

            <button
                className="btn btn-dark mt-3"
                onClick={handleSave}
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "บันทึก"}
            </button>
        </div>
    )
}
export default education