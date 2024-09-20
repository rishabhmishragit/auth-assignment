import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import UserRoutes from "./routes/users.js";
import AuthRoutes from "./routes/auth.js";
console.log("kjdflkjdlkjlfjlkdj=========>");
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 3000;

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
console.log("====================================>>>>");
//routes
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => console.log(`Listening on the port ${PORT}`));
