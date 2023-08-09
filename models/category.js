const mongoose = require("mongoose");

const categorySchema =  mongoose.Schema(
  {
    
    category: {
      type: String,
      required: true,
    },
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subCats' }],
  },
  {
    timeStamp: true,
  }
);


const cats = mongoose.model("cats", categorySchema);
module.exports = cats;
