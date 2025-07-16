const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const {connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
const Auth2Routes = require("./routes/Auth2Routes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const cookieParser = require("cookie-parser");
const Category = require("./models/categoryModel");
const Subcategory = require("./models/subcategoryModel");
const Product = require("./models/productModel");
const slugify = require("slugify");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // <-- Your frontend origin
  credentials: true    ,            
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);



// routes
// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/products",productRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes)

app.use("/",Auth2Routes);
app.get("/server", async (req, res) => {
    try {
        res.send("Server is running");
    } catch (error) {
        next(error);
    }
});



//Not Found Middleware, place at the end
app.use(notFound);
app.use(errorHandler);

//SPA for Render
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });
// console.log('Serving:', path.join(__dirname, '../frontend/dist/index.html'));

//Server start
app.listen(PORT, async() => {
    await connectDB();
    

  console.log(`Server is running on port ${PORT}`);
});






