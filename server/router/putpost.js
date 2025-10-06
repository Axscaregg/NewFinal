const express =require("express")
const {getDB} = require("../Database/db");
const router = express.Router()
const { ObjectId } = require('mongodb');
router.post("/add", async (req, res) => {
    try {
        let newDocument = {...req.body,createdAt: new Date()};
        let collection = await getDB().collection("users");
        let result = await collection.insertOne(newDocument);
        res.status(201).json({
            ...newDocument,
            _id: result.insertedId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding users");
    }
});
router.post("/upsert", async (req,res) =>{
    try {
        const {_id,name,Lastname,gender,Email,Phone} = req.body
        let collection = await getDB().collection("users");
        let result;
        let operationType;
        let finalDocument;
            if(_id){
                if(!ObjectId.isValid(_id)){
                    return res.status(404).json({
                        message: "Invalid Id"
                    })
                }
                const updata = {
                    name,Lastname, gender,Email,Phone,updateAt: new Date()
                }
                result = await collection.updateOne(
                    {_id: new ObjectId(_id)},
                    { $set: updata}
                )
                if(result.matchedCount ===0){
                    res.status(400).json({
                        message: "Not Update"
                    })
                }
                operationType ="update"
                finalDocument(_id,...updata)
            }else{
                const newDocument = {
                    name: req.body.name,
                    Lastname: req.body.Lastname,
                    Gender: req.body.Gender,
                    Email:req.body.Email,
                    Phone:req.body.Phone,
                    createdAt: new Date()


                };
                result = await collection.insertOne(newDocument)
                operationType = "Created"
                finalDocument ={
                    ...newDocument,
                    _id: result.insertedId
                }
            }
            res.status(operationType ==="Created"?201:200).json({
                message: `User ${operationType} successfully`,
                user: finalDocument
            })


    }catch (err){
        console.error("Upsert error:", err);
        res.status(500).json({
            message: "Error during upsert operation",
            error: err.message
        });
    }
})
module.exports = router;