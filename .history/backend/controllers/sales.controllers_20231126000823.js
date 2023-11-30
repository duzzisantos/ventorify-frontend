const Shelf = require("../models/aggregate-shelf-model");
const SalesSchema = require("../models/sales");
const PDFDoc = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");

exports.fromShelfToSales = async (req, res) => {
  const productName = req.params.product;
  const {
    quantitySold,
    customerName,
    customerId,
    customerPhone,
    customerAddress,
  } = req.body;

  try {
    // Find the matching item in the shelf collection based on the product name
    const item = await Shelf.findOne({ product: productName });

    if (!item) {
      return res
        .status(404)
        .json({ error: "Item not found in the shelf collection" });
    }

    // Check if the available quantity (totalProductCount) is sufficient for the quantity sold
    if (item.totalProductCount < quantitySold) {
      return res
        .status(400)
        .json({ error: "Insufficient quantity available in the shelf" });
    }

    // Subtract the quantity sold from the available quantity (totalProductCount) in the shelf item
    item.totalProductCount -= quantitySold;
    await item.save();

    // Create a new instance in the sales collection with the transferred quantity and item information
    const newSale = new SalesSchema({
      product: item.product,
      totalProductCount: item.totalProductCount,
      category: item.category,
      economicOrderQuantity: item.economicOrderQuantity,
      unitPrice: item.unitPrice,
      salesOperations: {
        product: item.product,
        category: item.category,
        quantitySold,
        revenue: quantitySold * item.unitPrice,
        customerId,
        customerName,
        customerAddress,
        customerPhone,
        currentInventorySize: item.totalProductCount,
      },
    });

    await newSale.save();

    return res.status(200).json({ message: "Item sold successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var conditions = id ? { $regex: new RegExp(id), $options: "gi" } : {};

  SalesSchema.find(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

//Query sales data based on date created and customer ID

exports.generateOrderSummary = async (req, res) => {
  const { customerId } = req.body;

  if (customerId) {
    SalesSchema.find(customerId)
      .then((data) => {
        res.json(200);
        console.log(`${data.salesOperations.customerId} was found`);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
};

exports.dispatchOrderSummary = async (req, res) => {
  const { customerId } = req.body;

  if (customerId) {
    SalesSchema.find(customerId)
      .then((data) => {
        res.json(200);

        const doc = new PDFDoc();

        const stream = fs.createWriteStream("orders.pdf");
        doc.pipe(stream);

        data.forEach((item) => {
          doc
            .fontSize(16)
            .text(item.product, { underline: true })
            .fontSize(12)
            .text(item.category)
            .fontSize(12)
            .text(item.salesOperations.quantitySold)
            .moveDown();
        });

        const pdfBuffer = [];
        doc.on("data", (chunk) => pdfBuffer.push(chunk));
        doc.end();

        //Email and password for the sender
        const requesterEmail = process.env.GMAIL_USERNAME;
        const requesterPassword = process.env.GMAIL_PASSWORD;
        const mailServerHost = process.env.HOST;

        //Email parameters
        const emailTransporter = nodemailer.createTransport({
          auth: {
            user: requesterEmail,
            pass: requesterPassword,
          },
          host: mailServerHost,
          secure: false,
          port: 587,
          tls: {
            rejectUnauthorized: false,
          },
          debug: true,
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
};

exports.deleteAllSales = (req, res) => {
  SalesSchema.deleteMany({})
    .then((data) => {
      res.json(200);
      console.log(`${data.acknowledged}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
