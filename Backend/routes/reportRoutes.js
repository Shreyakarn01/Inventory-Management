const Sale = require('../models/Sale');
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const fetchAdmin = require('../middleware/fetchAdmin');

router.get('/employeeAnalysis',fetchAdmin,async(req,res)=>{
    reportController.employeeAnalysis(req,res);
})

router.get('/productAnalysis',fetchAdmin,async(req,res)=>{
    reportController.productAnalysis(req,res);
})

router.get('/revenueAnalysis',fetchAdmin,async(req,res)=>{
    reportController.revenueAnalysis(req,res);
})

router.get('/exportLowStockItems',fetchAdmin,async(req,res)=>{
    reportController.exportLowStockItems(req,res);
})

router.get('/exportLowStockItemsExcel',fetchAdmin,async(req,res)=>{
    reportController.exportLowStockItemsExcel(req,res);
})

module.exports = router;