import mongoose from "mongoose";


const ProductsSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    catagory:String,
    sizes:Array,
    deliveryInfo:String,
    onSale:String,
    priceDrop:Number,
    imgUrl:String,
},{timestamps:true})
const Product=mongoose.models.Products || mongoose.model("Products",ProductsSchema)
export default Product