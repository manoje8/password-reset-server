import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"
import Mongo from "./config/dbConnect.js"
import route from "./router/router.js";

dotenv.config();
Mongo.connect();
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.UI_URL
}))
app.use(morgan("dev"))

app.use("/", route)

const port = process.env.PORT;

app.listen(port, () => console.log(`server running on port: ${port}`));
