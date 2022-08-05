import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    order: Object,
});

const productModel = mongoose.model("product", productSchema);

export default productModel;

// title: String,
// image: String,
// price: Number,
// rating: Number,
// id: Number,
