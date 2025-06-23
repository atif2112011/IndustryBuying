const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const {connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);



// routes
app.use("/auth",userRoutes);
app.get("/", async (req, res) => {
    try {
        res.send("Server is running");
    } catch (error) {
        next(error);
    }
});

//Not Found Middleware, place at the end
app.use(notFound);
app.use(errorHandler);


//Server start
app.listen(PORT, async() => {
    await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
