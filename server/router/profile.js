const router = require("express").Router()
const {ObjectId} = require("mongodb")
const {getDB} = require("../Database/db")
const requireAuth = require("../src/requireAuth")


router.get("/me", requireAuth,async (req,res)=>{
    const db =getDB()
    const me = await  db.collection("users").findOne(
        { _id: new ObjectId(req.user.id) },
        { projection: { passwordHash: 0, refreshToken: 0 } }
    )
    res.json(me||null)
})

router.post("/upsert", requireAuth,async (req,res) =>{
    try {
        const  db = getDB()
        const update ={
            name: req.body.name,
            Lastname: req.body.Lname,
            Gender: req.body.gender,
            Birthday: req.body.date,
            Country: req.body.contry,
            Nationality: req.body.nation,
            Weight: req.body.weight,
            Height: req.body.height,
            Phone:req.body.phone,
            Lineid: req.body.lineid,
            updateAt: new Date()
        }

        const r = await db.collection("users").updateOne(
            { _id: new ObjectId(req.user.id) },
            { $set: update  }
        );
    return     res.json({ok: true})
    }catch (e){
        console.error("Error upsert",e)
    }
})
module.exports = router

// const r = await db.collection("user").updateOne(
//     filer,
//     {
//         $set: update, $setOnInsert:{ _id: new objectID(req.body.id), createdAt: new Date()}
// },
//     {upsert: true}
// )