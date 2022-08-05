import express, { json } from "express";
import dotenv from "dotenv";
const stripe =
    "sk_test_51LQrH6EMY6St7oZJnL7e9XEEfFe4FE0o4wL5NTJCSwqYe4Dp7F4jjk8TqQ5RpHHFQgTTmVlVrVYhaLJaJaspF3Yt00REbbAHzi";
import bodyParser from "body-parser";
import cors from "cors";
import productModel from "./models/Products.js";
import { default as mongoose } from "mongoose";
import fileURLToPath from "url";
import path from "path";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// API

// - App config
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());
dotenv.config();
app.use(cors());

// Connect to DB
mongoose
    .connect(`${process.env.MONGO_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB is conccted"))
    .catch((err) => console.log(err));

app.get("/orders", async (req, res) => {
    try {
        const orders = await productModel.find({});
        res.status(200).send(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// API routes

app.post("/payment", async (request, response) => {
    const { order } = request.body;
    const newProduct = new productModel({
        order: order,
    });

    try {
        await newProduct.save();
    } catch (error) {
        response.status(404).json({ Error: error });
    }
});

// Deploing
app.use(express.static(path.join(dirname, "..", "build")));
app.get("*", (_req, res) => {
    res.sendFile(path.join(dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
