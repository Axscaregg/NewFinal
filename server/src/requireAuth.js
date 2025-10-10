const jwt = require("jsonwebtoken")

module.exports = function requireAuth(req,res,next){
    const auth = req.headers.authorization
    if(!auth){
        return  res.status(401).send({error:"No header"})
    }
    const token = auth.startsWith("Bearer") ? auth.slice(7) : null
    if(!token) return res.status(401).json({ message: "No Token"})
    try {
        const p = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = { id: p.sub,email: p.email}
    next()
    }catch {
        return  res.status(401).json({ message: "Token Error"})
    }
}