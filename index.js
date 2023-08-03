require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./productModel");
const app = express();

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "https://my-journey-20eb0.web.app" }));
app.use(express.json());

// routes
// READ
app.get("/holidays", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/holidays/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create
app.post("/holidays", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update
app.put("/holidays/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any holiday with ID ${id}` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
app.delete("/holidays/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any holiday with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to the database
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://piyapornlahr:${process.env.MONGODB_PASSWORD}@cluster0.6pohbn1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log(`Node API app is running on port 8080`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
