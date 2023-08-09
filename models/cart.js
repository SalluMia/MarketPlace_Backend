const mongoose = require("mongoose");

const cartSchema =  mongoose.Schema(
  {
    
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],

    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required:true
    },


  },
  {
    timeStamp: true,
  }
);


const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
