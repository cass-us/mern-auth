import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { paypalRoutes } from "./routes/paypalRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to the database
connectDB();
const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow the frontend to access the backend
  methods: "GET, POST, PUT, DELETE", // Allowed methods
  allowedHeaders: "Content-Type, Authorization", // Allow Authorization header for token
  credentials: true, // Allow cookies and headers
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// Middleware to handle content types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);

app.use("/api/paypal", paypalRoutes);

// Error handling middleware
app.use(errorHandler);

// Default route for server health check
app.get("/", (req, res) => res.send("Server is ready"));

// Error handling for unknown routes
app.use(notFound);

// Start the server
app.listen(port, () => console.log(`Server started at port ${port}`));
