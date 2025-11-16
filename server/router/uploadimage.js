const express = require("express")
const multer = require("multer")
const {getDB} = require("../Database/db");
const {ObjectId} = require("mongodb");

const route = express.Router()

const  ImaStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"uploads/")
    }, filename:(req,file,cb) =>{
        const uniqueName = Date.now()
        cb(null, uniqueName + "-" + file.originalname);
}
})
const upload = multer({ storage :ImaStorage });
route.post("/upload-avatar",upload.single("avatar"), async (req,res) =>{
    try {
        const db = getDB()
        const imgPath = `/uploads/${req.file.filename}`

        await db.collection("users").updateOne(
            {_id: new ObjectId(req.body.userId)},
            {$set: {avatar: imgPath}}
        )
        res.json({success: true, avatar: imgPath})
    }catch (error){
        console.error(error);
        res.status(500).json({ error: "Upload failed" });
    }
})
module.exports = route