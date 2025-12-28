const express =require('express')
const jwt = require('jsonwebtoken');
const argon2 = require('argon2')
const {getDB} = require("../Database/db");


const router = express.Router()
const ACCESS_EXPIRES = "15m"
const REFRESH_EXPIRES = "7d"

const signAccess = (p) => jwt.sign(p, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
const signRefresh = (p) => jwt.sign(p, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

router.post("/register", async (req,res)=>{
    try{
        const {email , password , name,lastname,confirmpassword} = req.body ?? {}
        if (!email || !password || !confirmpassword) return res.status(400).json({ message: "email/password จำเป็นต้องกรอก" });
        const db = getDB()
        const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
        const doc ={email:email.toLowerCase(), passwordHash,name,lastname}
        const result = await db.collection("users").insertOne(doc)
        res.status(201).json({
            doc,
            _id: result.insertedId
        })
    }catch (e){
        if (e?.code === 11000) return res.status(409).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
        console.error(e); res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }

})
router.post("/register/em", async (req,res)=>{
    try{
        const {email , password,confirmpassword,accountType,company,general} = req.body ?? {}
        if (!email || !password || !confirmpassword) return res.status(400).json({ message: "email/password จำเป็นต้องกรอก" });
        const db = getDB()
        const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
        const doc ={email:email.toLowerCase(), passwordHash,role:"employer",accountType,company: accountType === "company" ? company:null, general: accountType === "General" ? general : null , createdAt: new Date()};
        const result = await db.collection("users").insertOne(doc)
        res.status(201).json({
            doc,
            _id: result.insertedId
        })
    }catch (e){
        if (e?.code === 11000) return res.status(409).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
        console.error(e); res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }

})



router.post("/login", async  (req,res) =>{
    try {
        const  {email,password} = req.body ??{}
        const db =getDB()
        const user = await  db.collection('users').findOne({email: email.toLowerCase()})
        if(!user) return res.status(401).json({message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
        const agreement = await  argon2.verify(user.passwordHash,password)
        if(!agreement) return  res.status(401).json({message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
        const payload ={ sub:String(user._id) , email: user.email}
        const accessToken = signAccess(payload)
        const refreshToken = signRefresh(payload)
        res.cookie("refresh_Token",refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7*24*60*60*1000
        })
        res.json({accessToken,user:{id:String(user._id), email:user.email}})

    }catch (e){
        console.error(e); res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }

})
router.post("/refresh", (req, res) => {
    const rt = req.cookies?.["refresh_Token"]
    if (!rt) return res.status(401).json({ message: "ไม่มี refresh token" });
    try {
        const d = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
        const accessToken = signAccess({ sub: d.sub, email: d.email });
        res.json({ accessToken });
    } catch { res.status(401).json({ message: "refresh token ไม่ถูกต้อง" }); }
});

router.post("/logout", (req, res) => {
    res.clearCookie("refresh_Token", { path: "/" });
    res.json({ message: "Logged out" });
})
module.exports = router