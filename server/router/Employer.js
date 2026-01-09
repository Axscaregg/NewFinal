const {getDB} = require("../Database/db");
const express = require("express")
const router = express.Router()
const {ObjectId} = require("mongodb");
const requireAuth = require("../src/requireAuth");

router.post("/UpdateEm",requireAuth,async (req,res)=>{
    try{
        const db =  getDB()
        const Profile = {
            Role: req.body.Role,
            Location: req.body.Location,
            Facebook: req.body.Facebook,
            LineId: req.body.LineId,
            AboutMe: req.body.AboutMe,
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