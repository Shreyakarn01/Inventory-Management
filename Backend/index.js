require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const auditRoutes = require('./routes/auditRoutes');
const reportRoutes = require('./routes/reportRoutes');



connectToMongo();
const app = express();
const port = 5000;
app.use(express.json()); // to send something in req.body to the apis
const cors = require('cors');
app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/sales',saleRoutes);
app.use('/api/audits',auditRoutes);
app.use('/api/reports',reportRoutes);

app.listen(port,()=>{
    console.log(`Inventory-Backend listening at http://localhost:${port}`);
})