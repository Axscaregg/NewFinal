import React, {useState, useEffect, use} from "react";
import api from "../api/axios.js"
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
function education() {
        const [isSaving,setisSaving] = useState(false)
        const [loading, setloading] = useState(true)
        const [error,seterror] = useState(null)
        const [file,setfile] = useState(null)
        const [img,setimg] = useState("")
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
        const Id = localStorage.getItem("user")
        const ObjectID = JSON.parse(Id)
        const handleImg = async () =>{
            const formdata =  new FormData()
            formdata.append("avatar",file)
            formdata.append("userId",ObjectID.id)
            try {
                const res = await  api.post("/upload-avatar",formdata,{
                    headers: {
                        'Content-Type': 'multipart/form-data',

                    },

                })
                alert("บันทึกสำเร็จ");

            }catch (e){
                console.error("Save error:", e);
                alert("บันทึกไม่สำเร็จ");
            }


        }
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
                    if(data?.avatar){
                        setimg(data.avatar)
                    }
                }catch (e){
                    seterror(e.message)
                }finally {
                    setloading(false)
                }
            })()
        },[editor])


    const handleSave = async () => {
        if (!editor) return;
        setisSaving(true);
        try {
            const payload = {
                id: ObjectID.id,
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
        <div className="container-xxl mt-3 my-md4 ">
            <div className="row">
                <div className="col-lg-3 mb-4">

                    <div className="flex align-items-start">
                        <div className="accordion  my-accordion w-75">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseOne"
                                            aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Account
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne"
                                     className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <div className="list-group">
                                            <a className="list-group-item list-group-item-action " role="button"
                                               aria-current="true" href="/profile/me">
                                                Profile
                                            </a>
                                            <div className="my-2"></div>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action "
                                                    aria-current="true">
                                                Education
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-lg-7 mb-4 bg-white">
                    <div className="container py-3" >

                       <div className="row">
                           <div className="card">

                               <div>
                                   <input type="file" onChange={e => setfile(e.target.files[0])} />
                                   <button onClick={handleImg}>Upload</button>
                               </div>
                               <img src={`http://localhost:5000${img}`} className="card-img-top w-25 h-75 align-self-center" alt="..."/>

                           </div>
                       </div>

                        <div className="btn-group mb-2 mt-2" role="group">
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


                        <div className="border rounded p-2" style={{ minHeight: 760 }}>
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
                </div>
            </div>
        </div>

    )
}

export default education
// <div className="container py-3" style={{ maxWidth: 900 }}>
//
// <div className="btn-group mb-2" role="group">
//     <button
// type="button"
// className="btn btn-outline-secondary"
// onClick={() => editor.chain().focus().toggleBold().run()}
// disabled={!editor.can().chain().focus().toggleBold().run()}
// title="Bold"
//     >
//     <b>B</b>
// </button>
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().toggleItalic().run()}
//     disabled={!editor.can().chain().focus().toggleItalic().run()}
//     title="Italic"
// >
//     <i>I</i>
// </button>
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().toggleUnderline().run()}
//     title="Underline"
// >
//     <u>U</u>
// </button>
//
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().toggleBulletList().run()}
//     title="Bullet List"
// >
//     • List
// </button>
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().toggleOrderedList().run()}
//     title="Numbered List"
// >
//     1. List
// </button>
//
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().setTextAlign("left").run()}
//     title="Align Left"
// >
//     ⬅
// </button>
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().setTextAlign("center").run()}
//     title="Align Center"
// >
//     ⬇
// </button>
// <button
//     type="button"
//     className="btn btn-outline-secondary"
//     onClick={() => editor.chain().focus().setTextAlign("right").run()}
//     title="Align Right"
// >
//     ➡
// </button>
// </div>
//
//
// <div className="border rounded p-2" style={{ minHeight: 220 }}>
//     <EditorContent editor={editor} />
// </div>
//
// <button
//     className="btn btn-dark mt-3"
//     onClick={handleSave}
//     disabled={isSaving}
// >
//     {isSaving ? "Saving..." : "บันทึก"}
// </button>
// </div>