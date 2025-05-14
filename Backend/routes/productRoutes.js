const express = require('express');
const router = express.Router();
const productController =require('../controllers/productController');
const {body,validationResult} = require('express-validator');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchStaff = require('../middleware/fetchStaff');


router.post('/createproduct',fetchAdmin,[
   body('name','Product name is required').notEmpty(),
   body('category','Product category is required').notEmpty(),
   body('quantity','Product quantity is required').notEmpty(),
   body('unitPrice','Unit price is required').notEmpty(),
//    body('lowStockThreshold','Low Threshold Stock value is required').optional().isInt({ min: 0 })
],async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({errors: errors.array()});

    productController.createProduct(req,res);
})


router.get('/getAdminSpecificProducts',fetchAdmin,async(req,res)=>{
    productController.getAllAdminSpecificProducts(req,res);
})

router.get('/getAllBusinessProductStaff',fetchStaff,async(req,res)=>{
    productController.getAllBusinessProductStaff(req,res);
})


router.patch('/updateProduct/:id',fetchAdmin,async (req,res)=>{
    productController.updateProduct(req,res);
})

router.delete('/deleteProduct/:id',fetchAdmin,async(req,res)=>{
    productController.deleteProduct(req,res);
})

router.get('/getLowStockProducts',fetchAdmin,async(req,res)=>{
    productController.getLowStockProducts(req,res);
})


module.exports = router;