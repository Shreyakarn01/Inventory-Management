const Product = require('../models/Product');
const User = require('../models/User');


const createProduct = async (req, res) => {
    try {
        let { name, category, quantity, unitPrice, lowStockThreshold } = req.body;

        let existingProduct = await Product.findOne({ name, addedBy: req.admin._id});
        if (existingProduct) return res.status(400).send({ error: 'A product with this name already exists' });

        if (lowStockThreshold === '') {
            lowStockThreshold = undefined;
        }
        const product = new Product({
            name,
            category,
            quantity,
            unitPrice,
            lowStockThreshold,
            addedBy: req.admin._id,
            businessId: req.admin.businessId
        })

        await product.save();

        res.send({ message: "Product added", adminId: `${req.admin._id}` });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const getAllAdminSpecificProducts = async (req, res) => {
    try {
        const adminId = req.admin._id;

        const products = await Product.find({ addedBy: adminId });
        res.send(products);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const getAllBusinessProductStaff = async (req, res) => {
    try {
        const staffBusinessId = req.staff.businessId;

        const admin = await User.findOne({businessId:staffBusinessId,role:'admin'});

        const products = await Product.find({ addedBy: admin._id });
        res.send(products);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const adminId = req.admin._id;

        const product = await Product.findById(productId);
        if (!product) return res.status(403).send({ error: 'Product not found' });

        if (product.addedBy.toString() !== adminId.toString()) return res.status(404).send({ error: 'Unauthorized to update this product' });

        const { name, category, quantity, unitPrice, lowStockThreshold } = req.body;

        if (name) product.name = name;
        if (category) product.category = category;
        if (quantity!==undefined) product.quantity = quantity; //checking undefined, bcoz we want 0 as a valid number otherwise if not checked then 0 would have been discarded
        if (unitPrice!==undefined) product.unitPrice = unitPrice;
        if (lowStockThreshold!==undefined) product.lowStockThreshold = lowStockThreshold;

        await product.save();

        return res.send({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}



const deleteProduct = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).send({ error: 'Product not found' })

        //matching the product addedBy id and loggedIn adminId
        if (product.addedBy.toString() !== adminId.toString()) return res.status(403).send({ error: 'Unauthorized to delete this product' });

        await Product.findByIdAndDelete(productId);

        return res.send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


const getLowStockProducts = async (req,res) =>{
    try{
        const adminId = req.admin._id;

        const products = await Product.find({addedBy : adminId});

        const lowStockProducts = products.filter((product)=>{return product.quantity<product.lowStockThreshold});

        res.send(lowStockProducts);

    }catch(error){
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}




module.exports = {
    createProduct, getAllAdminSpecificProducts, getAllBusinessProductStaff, updateProduct, deleteProduct, getLowStockProducts
};