const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utility/sendEmail');
// const fetchAdmin = require('../middleware/fetchAdmin');

const createAdmin = async (req, res) => {
    try {
        const { fullName, businessName, email, password, phone, businessId, role } = req.body;


        let existinguser = await User.findOne({ email });
        if (existinguser) return res.status(400).json({ error: "Sorry a user with this email already exists" });
        existinguser = await User.findOne({ businessId, role: 'admin' });
        if (existinguser) return res.status(400).json({ error: "Sorry an admin with this businessId already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new User({
            fullName,
            businessName,
            email,
            password: hashedPassword,
            phone,
            businessId,
            role
        });
        await admin.save();

        const data = {
            id: admin._id,
            role: admin.role
        }
        const access_token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refresh_token = jwt.sign(data, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.send({ access_token, refresh_token,role: admin.role });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let existinguser = await User.findOne({ email });
        if (!existinguser) return res.status(400).json({ error: 'No such user found' });

        const passwordCompare = await bcrypt.compare(password, existinguser.password);
        if (!passwordCompare) return res.status(400).json({ error: 'Please try to login with correct credentials' });

        const access_token = jwt.sign({ id: existinguser._id, role: existinguser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refresh_token = jwt.sign({ id: existinguser._id, role: existinguser.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.json({ access_token, refresh_token,role: existinguser.role });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const createStaff = async (req, res) => {
    const { fullName, email, password, phone, role } = req.body;
    try {
        let existinguser = await User.findOne({ email });
        if (existinguser) return res.status(400).json({ error: 'Staff with this email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const staff = new User({
            fullName,
            businessName: req.admin.businessName,
            email,
            password: hashedPassword,
            phone,
            businessId: req.admin.businessId,
            role
        });

        await staff.save();

        const message = `Hi ${fullName},\n\nYou have been added as a staff by your admin ${req.admin.fullName}.\n\nLogin using your email: ${email}\n Temporary Password: ${password}\n\nPlease login and change your password.\n\nThanks, \nNextInvent`;

        await sendEmail(req.admin.businessName, email, 'Welcome to Inventory System', message);

        res.status(201).json({ message: 'Staff registered successfully and email sent', staffId: staff._id });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


const getAdmin = async (req, res) => {
    try {
        const adminData = req.admin;
        res.send(adminData);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


const getStaff = async (req, res) => {
    try {
        const staffData = req.staff;
        res.send(staffData);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const getAllAdmin = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        res.send(admins);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error');
    }

}

const getAllStaff = async (req, res) => {
    try {
        const adminBusinessId = req.admin.businessId;
        const staffs = await User.find({ role: 'staff' ,businessId: adminBusinessId}).select("-password");
        res.send(staffs);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error');
    }
}


const deleteStaff = async (req, res) => {
    try {
        const businessId = req.admin.businessId;
        const adminRole = req.admin.role;
        const staffId = req.params.id;

        const staff = await User.findById(staffId);

        if (!staff) return res.status(404).send({ error: 'Staff not found' });

        if (staff.businessId.toString() !== businessId.toString() && adminRole !== 'admin') return res.status(403).send({ error: 'Unauthorized to delete' });

        await User.findByIdAndDelete(staffId);
        res.send({ message: 'Staff deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    createAdmin, loginUser, createStaff, getAdmin, getStaff, getAllAdmin, getAllStaff, deleteStaff
};