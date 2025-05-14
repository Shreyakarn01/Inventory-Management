const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const {body,validationResult} = require('express-validator');
const fetchStaff = require('../middleware/fetchStaff');
const fetchAdmin = require('../middleware/fetchAdmin');



router.post('/createSale',fetchStaff,[
   body('productName','Product Name is required').notEmpty(),
   body('quantitySold','Quantity sold is required').notEmpty()
],async(req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()) return res.status(400).send({errors: errors.array()});

   saleController.createSale(req,res);
})

router.patch('/updateSaleByStaff/:id',fetchStaff,async(req,res)=>{
    saleController.updateSaleByStaff(req,res);
})

router.delete('/deleteSaleByStaff/:id',fetchStaff,async (req,res)=>{
    saleController.deleteSaleByStaff(req,res);
})

router.delete('/deleteSaleByAdmin/:id',fetchAdmin,async(req,res)=>{
    saleController.deleteSaleByAdmin(req,res);
})
router.patch('/updateSaleByAdmin/:id',fetchAdmin,async(req,res)=>{
    saleController.updateSaleByAdmin(req,res);
})

router.get('/getAllSaleOfBusiness',fetchAdmin,async(req,res)=>{
    saleController.getAllSaleOfBusiness(req,res);
})

router.get('/getSpecificStaffSale',fetchStaff,async(req,res)=>{
    saleController.getSpecificStaffSale(req,res);
})





module.exports = router;