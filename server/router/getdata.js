const express =require("express")
const {getDB} = require("../Database/db");
const router = express.Router()

router.get('/users', async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});    module.exports = router;