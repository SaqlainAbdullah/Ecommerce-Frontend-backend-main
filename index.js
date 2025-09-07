import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";

dotenv.config();

const app = express();

// traffic come from everywhere
app.use(cors());
app.use(express.json());

// connecting to mongodb
const ConnectDb = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB connected");
  } catch (err) {
    console.log(err);
  }
};
ConnectDb();

let products = [
  {
    id: 1,
    name: "Corsair HS45 Headphone",
    price: 4500,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtSF57VY9AWkYavK_Qdn5I6wN0om4IO-zuw&s",
    desc: "A comfortable and high-quality gaming headset.",
  },
  {
    id: 2,
    name: "RTX 3060",
    price: 9000,
    imageUrl:
      "https://static.webx.pk/files/2603/Images/14-czone.com.pk-1540-12831-250122082031-2603-2261410-231124021614482.jpg",
    desc: "A powerful graphics card from nvidia.",
  },
];

app.get("/products", async (req, res) => {
  try {
    const productFromDB = await Product.find();
    res.status(200).json(productFromDB);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

app.post("/products", async (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  try {
    // Generate a unique ID based on current timestamp
    const existingProducts = await Product.find();
    const newId = existingProducts.length > 0 ? Math.max(...existingProducts.map(p => p.id)) + 1 : 1;
    
    const newDBProduct = new Product({
      id: newId,
      name: newProduct.name,
      price: newProduct.price || 0,
      imageUrl: newProduct.imageUrl,
      desc: newProduct.desc,
    });
    await newDBProduct.save();
    res.status(201).json(newDBProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    await Product.findOneAndUpdate({ id: id }, { ...updatedProduct });
    res.json("successfully updated");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: id });
    console.log(deletedProduct);
    if (deletedProduct) {
      return res.status(200).json("successfully deleted");
    } else {
      return res.status(404).json("product not found");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

app.listen(5050, () => {
  console.log("Server is running on PORT 5050");
});
