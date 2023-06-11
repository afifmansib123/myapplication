
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
     {
        name : {type : String, required : true},
        slug : {type : String, required : true},
        price : {type : String, required : true},
        image : {type : String, required : true},
        quantity : {type : Number, required : true},
        countinstock : {type : Number, required : true},
        rating : {type : Number, required : true,default:0},
        numReviews : {type : Number, required : true,default:0},
        description: {type : String, required : false},
     },{
        timestamps:true,
     }
)

const Product = mongoose.models.Product|| mongoose.model('Product', ProductSchema)

export default Product