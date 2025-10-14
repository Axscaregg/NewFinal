const express = require("express")
const router = express.Router()
const {getDB} = require("../Database/db")
const {ObjectId} = require("mongodb")
const requireAuth = require("../src/requireAuth")
const sanitizeHtml = require("sanitize-html");

const sanitizeOptions = {
    allowedTags: [
        "p","br","span","strong","em","u","blockquote",
        "h1","h2","h3","h4","h5","h6","ul","ol","li","code","pre","hr","a"
    ],
    allowedAttributes: {
        a: ["href","name","target","rel"],
        "*": ["style"]
    },
    allowedStyles: {
        "*": { "text-align": [/^(left|center|right|justify)$/] }
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" })
    },
    allowedSchemes: ["http","https","mailto"],
};
router.get("/main",requireAuth,async (req,res) =>{
   try {
       const db = getDB()

       const doc = await db.collection("users").findOne(
           {_id: new ObjectId(req.user.id)},
           { projection: { passwordHash: 0, refreshToken: 0 } }
       )
       res.json(doc ?? {...doc, html:doc?.html ||""})
   }catch (e){
        console.error("error cause",e)

   }
})

router.post("/main/edit",requireAuth,async (req,res)=>{
    try {
        const db = getDB()
        const {doc,html} = req.body ?? {}
        const  userId = new ObjectId(req.user.id)
        const safeHtml = sanitizeHtml(html ?? "", sanitizeOptions)
        await db.collection("users").updateOne(
            {_id: new ObjectId(req.user.id)},
            {
                $set: {
                    html: safeHtml,
                    doc: doc||null,
                    updateAt: new Date()
                }
            }
        )
        res.json({ok:true})
    }catch (e){
        console.error("error",e)

    }
})
module.exports = router