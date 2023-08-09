const Cats = require("../models/category");
const Prods = require("../models/products");
const subCats = require("../models/subCategory");
const Cart=require('../models/cart')


////**
///////Categories
/////////*/

exports.addCategory = async (req, res) => {
  try {
    const { category, subCategory } = req.body;
    console.log(req.body);
    const newCategory = await Cats.create({ category, subCategory });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Could not create category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const allCats = await Cats.find().select('category').populate({
      path:'subCategory'
    }).select('subCategory').sort({ _id: -1 });;
    res.status(200).json({ allCats });
  } catch (error) {
    res.status(500).json({ message: "internal Server Error", error });
  }
};
exports.updateCats = async (req, res) => {
  try {
    const { category, subCategory } = req.body;
    const { categoryId } = req.params;
    console.log(req.body)

    const updatedCategory = await Cats.findByIdAndUpdate(
      categoryId,
      { category, subCategory },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Could not update category" });
  }
};

exports.deleteCats = async (req, res) => {
  try {
    const { id } = req.params;

    const categories = await Cats.findById(id);
    if (!categories) {
      res.status(401).json({ message: " Not found" });
    }

    categories.deleteOne();
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal Server Error", error });
  }
};

//////Sub Categories
///////
///////

exports.addSubCats = async (req, res) => {
  try {
    const { subCategory } = req.body;

    const subcategories = new subCats({
      subCategory,
    });

    await subcategories.save();
    res.status(200).json(subcategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal Server Error", error: error.stack });
  }
};

exports.getsubCategories = async (req, res) => {
  try {
    const allCats = await subCats.find().sort({ _id: -1 });
    res.status(200).json({ allCats });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal Server Error", error: error.stack });
  }
};

exports.updatesubCats = async (req, res) => {
    try {
    //   const { subCategories } = req.body;
      const { subcatId } = req.params;
  
      const updatedCategory = await subCats.findOneAndUpdate(
        {_id:subcatId},
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Could not update category" });
    }
  };

exports.deletesubCats = async (req, res) => {
  try {
    const { subcatId } = req.params;
    const { subcategories } = req.body;

    const deletesubcat = await subCats.findById(subcatId);
    if (!deletesubcat) {
      res.status(401).json({ msg: "Not Found" });
    }

    deletesubcat.deleteOne();

    res.status(200).json({ message: "Deleted", deletesubcat });
  } catch (error) {
    res.json(500).json({ msg: "internal server error", error: error.stack });
  }
};

////**
///////Products
/////////*/

exports.addProduct = async (req, res) => {
  try {
    const prod_image = req.file.filename;
    if (!prod_image) {
      res.status(404).json({ msg: "image not found" });
    }
    const products = new Prods({
      ...req.body,
      prod_image,
    });
    await products.save();
    res.status(200).json({ msg: "Product created successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal Server Error", error: error.stack });
  }
};

exports.getAllProducts=async(req,res)=>{
      try{
         const allproducts=await Prods.find({})
         if(!allproducts){
            res.status(404).json({msg:"Products Not Found"})
         }
         res.status(200).json({allproducts});
      }
      catch(error){
         res.status(500).json({message:"Internal server error", error:error.stack})
      }
}

exports.deleteProducts=async(req,res)=>{
     try{
          const {productId}=req.params;

          const products=await Prods.findById(productId);
          if(!products){
            res.status(404).json({msg:"Product id doesnt found"})
          }

          products.deleteOne();

          res.status(200).json({msg:"Product Deleted Successfully", products});
     }
     catch(error){
      res.status(500).json({msg:"Internal server error", error:error.stack})
     }
}
exports.updateProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const prod_image = req.file.filename;

    if (!prod_image) {
      res.status(404).json({ msg: "image not found" });
      return; // Return to exit the function early if image not found
    }

    const updatedProduct = await Prods.findOneAndUpdate(
      { _id: productId },
      {
        ...req.body,
        prod_image: prod_image,
      },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ msg: "Product id not found" });
      return; // Return to exit the function early if product id not found
    }

    res.status(200).json({ msg: "Product Updated Successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.stack });
  }
};


// 
//////////getSingleProduct
////////////

exports.getSingleProduct=async(req,res)=>{
     try {
      const {productId}=req.params


       const singleProd=await Prods.findOne({_id:productId});

      if (!singleProd) {
        res.status(404).json({ msg: "Product id not found" });
        return; // Return to exit the function early if product id not found
      }
      res.status(200).json({ msg: "Single Product", singleProd });
     
     }
     catch(error){
    res.status(500).json({ msg: "Internal server error", error: error.stack });
       
     }
}


