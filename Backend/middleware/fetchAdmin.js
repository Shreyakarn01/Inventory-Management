const jwt = require('jsonwebtoken');
const User = require('../models/User');


const fetchAdmin = async (req,res,next)=>{
    const token = req.header('Authorization');
    if(!token) return res.status(401).send({error: 'Access denied. No token found'});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // it returns the original payload when it was signed
        const admin = await User.findById(decoded.id).select("-password"); // this is coming from the original place where we signed using jwt.sign()

        if(!admin || admin.role !== 'admin') return res.status(403).send({error: 'Access denied. Admin only.'});

        req.admin = admin;
        next();

    }catch(error){
        console.error(error.message);
        res.status(500).send('Internal server Error')
    }
}

module.exports = fetchAdmin;