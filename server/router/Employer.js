const {getDB} = require("../Database/db");
const express = require("express")
const router = express.Router()
const {ObjectId} = require("mongodb");

const requireAuth = require("../src/requireAuth");
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


router.post("/UpdateEm",requireAuth,async (req,res)=>{
    try{
        const db =  getDB()
        const safeHtml = sanitizeHtml(req.body.AboutMe ?? "", sanitizeOptions);
        const Profile = {
            Role: req.body.Role,
            Location: req.body.Location,
            Facebook: req.body.Facebook,
            LineId: req.body.LineId,
            AboutMe: safeHtml,
        }
        const r = await db.collection("users").updateOne(
            {_id: new ObjectId(req.body.id)},
            { $set: {Profile} }
        )
        return res.json({ok:true})
    }catch(err){
        console.error("Error updating users", err)
    }
})
module.exports = router