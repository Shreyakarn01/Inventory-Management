const AuditLog = require('../models/AuditLog');
const Sale = require('../models/Sale');
const User = require('../models/User');

const getAllBusinessAudit = async(req,res)=>{
    try{
        const adminBusinessId = req.admin.businessId;

        const audits = await AuditLog.find({businessId : adminBusinessId}).populate('soldById','fullName');

        res.send(audits);

    }catch(error){
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const getStaffSpecificAudit = async(req,res)=>{
    try{
        const staffId = req.staff._id;

        const sales = await Sale.find({soldBy : staffId});

        const saleIds = sales.map((sale)=>{return sale.soldBy});

        const audits = await AuditLog.find({soldById : {$in : saleIds} }).populate('soldById','fullName');

        res.send(audits);

    }catch(error){
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getAllBusinessAudit, getStaffSpecificAudit
}