const express = require("express");

const app = express();

app.use(express.json());
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];


//Task---1--->
app.get("/products", (req, res) => {
  res.status(200).json(products);
});


//Task---2--->
app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const productDetail = products.find(u => u.id === productId);

  if (!productDetail) {
    return res.status(404).json({ message: "Product not found with this id" });
  }

  res.status(200).json(productDetail);
});

//Task---3--->
app.get("/products/category/:categoryName", (req, res) => {
  const categoryname = req.params.categoryName;
  const productCategory = products.find(u => u.category.toLowerCase().includes(categoryname.toLowerCase()));

  if (!productCategory) {
    return res.status(404).json({ message: "Product not found with this category" });
  }

  res.status(200).json(productCategory);
});

//Task---4--->
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length+1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
  };

  products.push(newProduct);
  res.status(201).json({
    message: "User created",
    product: newProduct
  });
});


//Task---5--->
app.put("/products/:id", (req, res) => {
  const proId = Number(req.params.id);

  const productIndex = products.findIndex(p => p.id === proId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found with this id" });
  }

  products[productIndex] = {
    id: proId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
  };

  res.status(200).json({
    message: "Product replaced successfully",
    product: products[productIndex]
  });
});


//Task---6--->
app.put("/products/:id/stock", (req, res) => {
  const proId = Number(req.params.id);
  const Productput = products.findIndex(p => p.id === proId);

  if (Productput === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  products[Productput] = {
    stock: req.body.stock,
  };

  res.status(200).json({
    message: "Product Stock replaced",
    product: products[Productput]
  });
});


//Task---7--->
app.put("/products/:id/price", (req, res) => {
  const proId = Number(req.params.id);
  const Productput = products.findIndex(p => p.id === proId);

  if (Productput === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  products[Productput] = {
    price: req.body.price,
  };

  res.status(200).json({
    message: "Product price replaced",
    product: products[Productput]
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});