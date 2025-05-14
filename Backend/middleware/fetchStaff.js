const jwt = require('jsonwebtoken');
const User = require('../models/User');

const fetchStaff = async (req,res,next) =>{
    const token = req.header('Authorization');
    if(!token) return res.status(401).send({error: "Access denied. No token found."});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const staff = await User.findById(decoded.id).select("-password");

        if(!staff || staff.role !== 'staff') return res.status(403).send({error: 'Not found.'})

        req.staff = staff;
        next();

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = fetchStaff;