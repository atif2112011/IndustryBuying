const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const Auth2Routes = require("./routes/Auth2Routes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const testimonialRoutes = require("./routes/testimonialRoute");
const brandRoutes = require("./routes/brandsRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const mailRoutes = require("./routes/MailRoutes");

const cookieParser = require("cookie-parser");

const path = require("path");
const morgan = require("morgan");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // <-- Your frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// routes
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/certificates", certificateRoutes);


app.use("/", Auth2Routes);
app.get("/server", async (req, res) => {
  try {
    res.send("Server is running");
  } catch (error) {
    next(error);
  }
});

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
  // Check if it's a GET request and not an API call
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  } else {
    next(); // Pass to the next handler (likely a 404 error)
  }
});
}

//Not Found Middleware, place at the end
app.use(notFound);
app.use(errorHandler);



// if(process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });
// }



//Server start
app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on port ${PORT}`);
});
