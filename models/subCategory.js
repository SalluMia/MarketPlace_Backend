const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    subCategory: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

const cats = mongoose.model("subCats", subCategorySchema);
module.exports = cats;
