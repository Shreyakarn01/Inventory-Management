const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchStaff = require('../middleware/fetchStaff');

router.get('/getAllBusinessAudit',fetchAdmin,async(req,res)=>{
    auditController.getAllBusinessAudit(req,res);
})

router.get('/getStaffSpecificAudit',fetchStaff,async(req,res)=>{
    auditController.getStaffSpecificAudit(req,res);
})

module.exports = router;