const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
      prod_name:{
         type:String,
         required:true,
      },
      prod_desc:{
        type:String,
        required:true,
      },
      prod_price:{
        type:Number,
        required:true,
      },
      stock:{
        type:Number,
        required:true
      },
      category_id:{
        type:mongoose.Types.ObjectId,
        ref:'cats',
        required:true,
      },
      subCategory_id:[
        {
          type:mongoose.Types.ObjectId,
          ref:'subCats',
          required:true,
        },
      ],
      prod_image:{
        type:String,
        required:true,
      }
      

}, {
    timestamps:true
})

const prods= mongoose.model('product', productSchema)

module.exports=prods

