const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body,validationResult} = require('express-validator');
const fetchAdmin = require('../middleware/fetchAdmin')
const fetchStaff = require('../middleware/fetchStaff');

router.post('/createAdmin',[
    body('fullName','Name is required').notEmpty(),
    body('email','Valid email is required').isEmail(),
    body('password','Password must be atleast 6 characters').isLength({min:6}),
    body('businessName','Business name is required').notEmpty(),
    body('phone','Phone number is required').notEmpty(),
    body('businessId','Business/Company ID is required').notEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    userController.createAdmin(req,res);
});

router.post('/loginUser',[
    body('email','Valid email is required').isEmail(),
    body('password','Password must be atleast 6 characters').isLength({min:6})
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    userController.loginUser(req,res);
});

router.post('/createStaff',fetchAdmin,[
    body('fullName','Name is required').notEmpty(),
    body('email','Valid email is required').isEmail(),
    body('password','Password must be atleast 6 characters').isLength({min:6}),
    body('phone','Phone number is required').notEmpty(),  
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({errors: errors.array()});

    userController.createStaff(req,res);
})


router.get('/getAdmin',fetchAdmin,async (req,res)=>{
    userController.getAdmin(req,res);
})


router.get('/getStaff',fetchStaff,async (req,res)=>{
   userController.getStaff(req,res);
});

router.get('/getAllAdmin',async(req,res)=>{
    userController.getAllAdmin(req,res);
})

router.get('/getAllstaff',fetchAdmin,async (req,res)=>{
    userController.getAllStaff(req,res);
})

router.delete('/deleteStaff/:id',fetchAdmin,async(req,res)=>{
    userController.deleteStaff(req,res);
})






module.exports = router;