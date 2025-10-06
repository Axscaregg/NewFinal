const express =require("express")
const {getDB} = require("../Database/db");
const {ObjectId} = require("mongodb");
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch " });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const query = { _id: new ObjectId(req.params.id) };
        const item = await getDB().collection('users').findOne(query);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;