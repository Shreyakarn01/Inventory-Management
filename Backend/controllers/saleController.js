const Sale = require('../models/Sale');
const Product = require('../models/Product');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');


const createSale = async (req, res) => {
    try {
        const { productName, quantitySold } = req.body;
        const staffBusinessId = req.staff.businessId;

        const product = await Product.findOne({name : productName, businessId: staffBusinessId});
        
        if (!product) return res.status(404).send({ error: 'Product not found' });

        // const adminId = product.addedBy;

        // if (staffBusinessId.toString() !== adminId.toString()) return res.status(403).send({ error: 'Unauthorized : This product is not yours' });

        if (product.quantity < quantitySold) return res.status(400).send({ error: 'Not enough stock available' });

        const totalAmount = quantitySold * product.unitPrice;

        const sale = new Sale({
            product: product._id,
            unitPrice: product.unitPrice,
            quantitySold,
            totalPrice: totalAmount,
            soldBy: req.staff._id
        })

        await sale.save();


        product.quantity -= quantitySold;
        await product.save();

        const auditLog = new AuditLog({
            action : "sale created",
            performedById : req.staff._id,
            performedByName : req.staff.fullName,
            role : "staff",
            businessId : req.staff.businessId,
            changes : {
                productId: product._id,
                productName : product.name,
                unitPrice: product.unitPrice,
                quantitySold,
                totalPrice: totalAmount
            },
            soldById : sale.soldBy
        })

        await auditLog.save();


        return res.send({ message: "Sale created successfully", sale });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


const updateSaleByStaff = async (req, res) => {
    try {
        const saleId = req.params.id;

        const sale = await Sale.findById(saleId);
        if (!sale) return res.status(404).send({ error: 'Sale not found' });

        const staffId = req.staff._id;

        if(sale.soldBy.toString() !== staffId.toString()) return res.status(403).send({ error: 'Unauthorized. This sale is not yours' });

        const { unitPrice, quantitySold } = req.body;

        const productId = sale.product;
        const product = await Product.findById(productId);

        if(sale.quantitySold < quantitySold) {
            const difference = quantitySold - sale.quantitySold;
            product.quantity -= difference;
        }
        else if(sale.quantitySold > quantitySold){
            const difference = sale.quantitySold - quantitySold;
            product.quantity += difference;
        }

        await product.save();


        if (unitPrice !== undefined) sale.unitPrice = unitPrice;
        if (quantitySold !== undefined) sale.quantitySold = quantitySold;
        sale.totalPrice = sale.unitPrice * sale.quantitySold;

        await sale.save();

        const auditLog = new AuditLog({
            action : "sale updated",
            performedById : req.staff._id,
            performedByName : req.staff.fullName,
            role : "staff",
            businessId : req.staff.businessId,
            changes : {
                productName : product.name,
                unitPrice : sale.unitPrice,
                quantitySold : sale.quantitySold,
                totalPrice : sale.totalPrice
            },
            soldById : sale.soldBy
        })

        await auditLog.save();

        res.send({ message: 'Sale updated successfully', sale });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');

    }
}


const deleteSaleByStaff = async (req, res) => {
    try {
        const saleId = req.params.id;

        const sale = await Sale.findById(saleId);
        if (!sale) return res.status(404).send({ error: 'Sale not found' });

        const staffId = req.staff._id;

        if(sale.soldBy.toString() !== staffId.toString()) return res.status(403).send({ error: 'Unauthorized. This sale is not yours' });
        
        await Sale.findByIdAndDelete(saleId);

        const productId = sale.product;
        const product = await Product.findById(productId);

        let prevQnty = 0;
        let finalQnty = 0;
        if (product) {
            prevQnty = product.quantity;
            product.quantity += sale.quantitySold;
            finalQnty = product.quantity;
            await product.save();
        }

        const quantityRestored = finalQnty - prevQnty;

        const auditLog = new AuditLog({
            action : "sale deleted",
            performedById: req.staff._id,
            performedByName : req.staff.fullName,
            role : "staff",
            businessId : req.staff.businessId,
            changes : {
                saleId : sale._id,
                productName : product.name,
                message : "Sale deleted"
            },
            soldById : sale.soldBy
        })

        await auditLog.save();

        return res.send({ message: 'Sale deleted successfully', quantityRestored: quantityRestored });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const deleteSaleByAdmin = async(req,res)=>{
    try{
        const saleId = req.params.id;
        const sale = await Sale.findById(saleId);
        if (!sale) return res.status(404).send({ error: 'Sale not found' });

        const adminBusinessId = req.admin.businessId;

        const staffId = sale.soldBy;
        const staff = await User.findById(staffId);
        const businessId = staff.businessId;

        if(businessId.toString() !== adminBusinessId.toString()) return res.status(403).send({ error: 'Unauthorized. This sale is not yours' });

        await Sale.findByIdAndDelete(saleId);

        const productId = sale.product;
        const product = await Product.findById(productId);

        let prevQnty = 0;
        let finalQnty = 0;
        if (product) {
            prevQnty = product.quantity;
            product.quantity += sale.quantitySold;
            finalQnty = product.quantity;
            await product.save();
        }

        const quantityRestored = finalQnty - prevQnty;

        const auditLog = new AuditLog({
            action : "sale deleted",
            performedById: req.admin._id,
            performedByName : req.admin.fullName,
            role : "admin",
            businessId : req.admin.businessId,
            changes : {
                saleId : sale._id,
                productName: product.name,
                message : "Sale deleted"
            },
            soldById : sale.soldBy
        })

        await auditLog.save();

        return res.send({ message: 'Sale deleted successfully', quantityRestored: quantityRestored });

    }catch(error){
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }

}

const updateSaleByAdmin = async(req,res)=>{
    try{
        const saleId = req.params.id;
        const sale = await Sale.findById(saleId);
        if (!sale) return res.status(404).send({ error: 'Sale not found' });

        const adminBusinessId = req.admin.businessId;

        const staffId = sale.soldBy;
        const staff = await User.findById(staffId);
        const businessId = staff.businessId;

        if(businessId.toString() !== adminBusinessId.toString()) return res.status(403).send({ error: 'Unauthorized. This sale is not yours' });

        const { unitPrice, quantitySold } = req.body;

        const productId = sale.product;
        const product = await Product.findById(productId);

        if(sale.quantitySold < quantitySold) {
            const difference = quantitySold - sale.quantitySold;
            product.quantity -= difference;
        }
        else if(sale.quantitySold > quantitySold){
            const difference = sale.quantitySold - quantitySold;
            product.quantity += difference;
        }

        await product.save();


        if (unitPrice !== undefined) sale.unitPrice = unitPrice;
        if (quantitySold !== undefined) sale.quantitySold = quantitySold;
        sale.totalPrice = unitPrice * quantitySold;

        await sale.save();


        const auditLog = new AuditLog({
            action : "sale updated",
            performedById : req.admin._id,
            performedByName : req.admin.fullName,
            role : "admin",
            businessId : req.admin.businessId,
            changes : {
                productName : product.name,
                unitPrice : sale.unitPrice,
                quantitySold : sale.quantitySold,
                totalPrice : sale.totalPrice
            },
            soldById : sale.soldBy
        })

        await auditLog.save();

        res.send({ message: 'Sale updated successfully', sale });


    }catch(error){
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }

}


const getAllSaleOfBusiness = async (req, res) => {
    try {
        const adminBusinessId = req.admin.businessId;

        const staffMembers = await User.find({ businessId: adminBusinessId, role: 'staff' });

        const staffIds = staffMembers.map((staff) => { return staff._id });

        const sales = await Sale.find({ soldBy: { $in: staffIds } }).populate('product','name').populate('soldBy','fullName');

        res.send(sales);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }

}

const getSpecificStaffSale = async (req, res) => {
    try {
        const staffId = req.staff._id;

        const sales = await Sale.find({ soldBy: staffId }).populate('product','name').populate('soldBy','fullName');

        res.send(sales);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }

}


module.exports = {
    createSale, deleteSaleByStaff, updateSaleByStaff, deleteSaleByAdmin, updateSaleByAdmin, getAllSaleOfBusiness, getSpecificStaffSale
}