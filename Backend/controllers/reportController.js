const Product = require('../models/Product');
const Sale = require('../models/Sale');
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const path = require('path');

const employeeAnalysis = async (req, res) => {
  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7); // e.g., "2024-07"
    const start = new Date(`${month}-01T00:00:00Z`);
    const end = new Date(new Date(start).setMonth(start.getMonth() + 1));

    const adminId = req.admin._id;

    const products = await Product.find({ addedBy: adminId });

    const productIds = products.map((product) => { return product._id });

    const sales = await Sale.find({ product: { $in: productIds }, saleDate: { $gte: start, $lt: end } }).populate('soldBy', 'fullName');

    const resultMap = {};

    sales.forEach(sale => {
      const date = new Date(sale.saleDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const employeeName = sale.soldBy?.fullName || 'Unknown';
      const totalPrice = sale.totalPrice;

      if (!resultMap[monthKey]) resultMap[monthKey] = {};
      resultMap[monthKey][employeeName] = (resultMap[monthKey][employeeName] || 0) + totalPrice;
    });

    // Format as array
    const result = Object.entries(resultMap).map(([month, employeeData]) => ({
      month,
      employees: Object.entries(employeeData).map(([employeeName, totalPrice]) => ({
        employeeName,
        totalPrice
      }))
    }));

    res.json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error');
  }
}


const productAnalysis = async (req, res) => {
  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7); // e.g., "2024-07"
    const start = new Date(`${month}-01T00:00:00Z`);
    const end = new Date(new Date(start).setMonth(start.getMonth() + 1));

    const adminId = req.admin._id;

    const products = await Product.find({ addedBy: adminId });

    const productIds = products.map((product) => { return product._id });

    const sales = await Sale.find({ product: { $in: productIds }, saleDate: { $gte: start, $lt: end } }).populate('product', 'name');


    // Group sales by month and product
    const resultMap = {};

    sales.forEach(sale => {
      const date = new Date(sale.saleDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const productName = sale.product?.name || 'Unknown';

      if (!resultMap[monthKey]) resultMap[monthKey] = {};

      if (!resultMap[monthKey][productName]) {
        resultMap[monthKey][productName] = {
          quantitySold: 0,
          totalRevenue: 0
        };
      }

      resultMap[monthKey][productName].quantitySold += sale.quantitySold;
      resultMap[monthKey][productName].totalRevenue += sale.totalPrice;
    });

    // Convert to array format
    const result = Object.entries(resultMap).map(([month, productsData]) => ({
      month,
      products: Object.entries(productsData).map(([productName, stats]) => ({
        productName,
        quantitySold: stats.quantitySold,
        totalRevenue: stats.totalRevenue
      }))
    }));

    res.json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal server Error');
  }
}


const revenueAnalysis = async (req, res) => {
  try {
    const adminId = req.admin._id;

    // Step 1: Get all products added by this admin
    const products = await Product.find({ addedBy: adminId }, { _id: 1 });
    const productIds = products.map(p => p._id);

    // Step 2: Get all sales related to these products
    const sales = await Sale.find({ product: { $in: productIds } });

    // Step 3: Calculate revenue grouped by month using plain JS
    const revenueMap = {};

    sales.forEach(sale => {
        const date = new Date(sale.saleDate);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        revenueMap[monthKey] = (revenueMap[monthKey] || 0) + sale.totalPrice;
    });

    // Step 4: Convert map to array format
    const revenueArray = Object.keys(revenueMap).sort().map(month => ({
        month,
        revenue: revenueMap[month]
    }));

    res.json(revenueArray);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error');
  }
}


const exportLowStockItems = async(req,res)=>{
  try{
    const adminId = req.admin._id;

    const adminData = await User.findById(adminId);

    const products = await Product.find({addedBy: adminId});

    const lowStockProducts = products.filter((product)=>{return product.quantity < product.lowStockThreshold});

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Disposition', 'attachment; filename=low_stock_items.pdf'); //This header tells the browser to treat the response as a downloadable file (attachment) and suggests the file name low_stock_items.pdf
    res.setHeader('Content-Type', 'application/pdf'); //This sets the content type to application/pdf, telling the browser that the response contains a PDF file

    doc.pipe(res); //This sends the PDF content generated by pdfkit directly to the HTTP response, so it is streamed to the browser or client as a downloadable PDF

    // Optional: Add logo
    const logoPath = path.join(__dirname, 'Logo.PNG');
    try {
      doc.image(logoPath, { fit: [50, 50], align: 'left', valign: 'top' });
    } catch (e) {
      console.warn('Logo image not found or failed to load.');
    }

    // Report Header
    doc.fontSize(20).text(adminData.businessName, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text('Low Stock Items Report', { align: 'center' });
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    // If no items are low stock
    if (lowStockProducts.length === 0) {
      doc.fontSize(14).text('No low stock items at the moment.', { align: 'center' });
      doc.end(); //Ends the PDF generation and sends the content to the client
      return; //Stops further execution if there are no items to display
    }

    // Table Headers
    const tableTop = doc.y; //Sets the initial position for the table headers based on the current position (doc.y) after previous elements (like the title)
    const columnSpacing = 150;
    const rowHeight = 25;
    const startX = 50; //The starting X-coordinate for the first column

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Item Name', startX, tableTop); //doc.text(): Adds the text for each header, with calculated X and Y coordinates. The headers are spaced out using columnSpacing
    doc.text('Quantity', startX + columnSpacing, tableTop);
    doc.text('Unit Price (₹)', startX + columnSpacing * 2, tableTop);
    doc.text('Threshold', startX + columnSpacing * 3, tableTop);

    // Table Rows
    let y = tableTop + rowHeight; //Initializes the Y-coordinate for the first row, based on the header's position (tableTop).
    doc.font('Helvetica');

    lowStockProducts.forEach((item) => {
      doc.text(item.name, startX, y);
      doc.text(item.quantity.toString(), startX + columnSpacing, y);
      doc.text(item.unitPrice?.toFixed(2) || 'N/A', startX + columnSpacing * 2, y);
      doc.text(item.lowStockThreshold.toString(), startX + columnSpacing * 3, y);
      y += rowHeight; //Moves the Y-coordinate down for the next row, ensuring each row is spaced out correctly
    });

    // Footer
    doc.moveDown(2); //Adds vertical space after the table
    doc.fontSize(10).fillColor('gray').text(`Generated on: ${new Date().toLocaleString()}`, {
      align: 'right',
    }); //Adds the timestamp of when the report was generated, aligned to the right side of the page

    doc.end(); //This finalizes the PDF document, signaling that no further content will be added. The PDF is then sent to the client.

  }catch(error){
    console.error(error.message);
    return res.status(500).send('Internal Server Error');
  }
}

const exportLowStockItemsExcel = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const adminData = await User.findById(adminId);
    const products = await Product.find({ addedBy: adminId });

    const lowStockProducts = products.filter(product => product.quantity < product.lowStockThreshold);
    
    const workbook = new ExcelJS.Workbook(); //Creates a new Excel workbook
    const worksheet = workbook.addWorksheet('Low Stock Items'); //Adds a worksheet (tab) titled "Low Stock Items" to the workbook

    worksheet.mergeCells('A1:D1'); //Merges cells A1 through D1 to make space for a centered title
    worksheet.getCell('A1').value = `${adminData.businessName} - Low Stock Items Report`; //Sets the value to something like "My Store - Low Stock Items Report"
    worksheet.getCell('A1').alignment = { horizontal: 'center' }; //Applies center alignment and bold formatting to make it look like a title
    worksheet.getCell('A1').font = { size: 14, bold: true };

    worksheet.addRow(['Item Name', 'Quantity', 'Unit Price (₹)', 'Threshold']); //Adds headers for the columns in the second row
    worksheet.getRow(2).font = { bold: true }; //Applies bold styling to the entire header row

    lowStockProducts.forEach(item => { //Iterates through the filtered products and Adds a row for each product 
      worksheet.addRow([
        item.name,
        item.quantity,
        item.unitPrice || 'N/A',
        item.lowStockThreshold,
      ]);
    });

    worksheet.columns.forEach(column => { //Makes all columns wider (20 characters) so the content fits nicely and is readable
      column.width = 20;
    });

    // Set headers for Excel download
    res.setHeader( //Sets the response headers so the browser Recognizes this as an Excel file
      'Content-Type', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=low_stock_items.xlsx'); //Sets the response headers so the browser Triggers a download with the filename low_stock_items.xlsx

    // Use pipe to send the file stream
    await workbook.xlsx.write(res); //Writes the Excel file directly to the HTTP response stream
    res.end(); //Ends the response after writing
  } catch (error) {
    console.error('Excel Export Error:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  employeeAnalysis, productAnalysis, revenueAnalysis, exportLowStockItems, exportLowStockItemsExcel
}