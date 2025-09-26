const express =require("express")
const {getDB} = require("../Database/db");
const {ObjectId} = require("mongodb");
const querystring = require("node:querystring");
const router = express.Router()

router.put("/update/:id",async (req,res) =>{

    try{

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const query = { _id: new ObjectId(req.params.id) };
        const updateData = {
            name: req.body.name,
            Lastname: req.body.Lastname,
            Gender: req.body.Gender,
            Email:req.body.Email,
            Phone:req.body.Phone,
            updateAt: new Date()
        }
        const collection =  await  getDB().collection("users")
        const result = await collection.updateOne(
            query,
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "users not found" });
        }

        res.json({ message: "users updated successfully" });
    }catch (err){
        console.error("Update error:", err);
        res.status(400).json({ message: "Error updating users" });
    }
})
router.delete("/delete/:id", async (req,res)=>{
    try{
        const query = { _id: new ObjectId(req.params.id) };
        if(!query === null){
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const db = getDB()
        const result = await db.collection('users').deleteOne(query)
        if(result.deletedCount===0){
            return  res.status(404).json({ message: 'users not found'})
        }
        res.json({ message: "User deleted successfully" });
    }catch (err){
        console.error("Delete error:", err);
        res.status(500).json({ message: "Error deleting user" });
    }
})

module.exports = router