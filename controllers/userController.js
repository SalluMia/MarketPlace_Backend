const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Cart=require('../models/cart')

///////
///* Registration Controller
//////
exports.registerUser = async (req, res, next) => {
    const { name, email, address, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "Email already registered" });
        return;
      }
  
      const user = new User({
        name,
        email,
        address,
        password,
      });
  
      await user.save();
      const Token=user.getSignedToken();
      res.status(201).json({ user, Token});
    } catch (error) {
         res.status(500).json({message:"internal server error", error})
    }
  };


///////
//////*Login 
/////////
  exports.login=async(req,res)=>{
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.status(400).json({ message: "All fields are mandatory" });
        return;
      }
  
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        res.status(404).json({ message: "Email or user not found" });
        return;
      }
      
      const matchPswd= await existingUser.matchPasswords(password);

      if (!matchPswd) {
        return res.status(401).json({ message: "Password Not Matched" });

      }
  
    
      const token=existingUser.getSignedToken()
      res.status(200).json({ existingUser, token });
    } catch (error) {
      console.error("Error during user login:", error);
      res.status(500).json({ message: "Internal server error", error });
    }

  }


  exports.addcartProduct=async(req,res)=>{
    try {
       const{productId,quantity}=req.body;
       const{user_id}=req.params;
  
       let cart=await Cart.findOne({user_id})
  
       if(!cart){
        cart=new Cart({user_id, products:[]})
       }
  
       const productIndex=cart.products.findIndex((product)=>product.productId.toString()===productId)
  
       if (productIndex !== -1) {
        // If the product is already in the cart, update its quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it to the products array
        cart.products.push({ productId, quantity });
      }
  
      // Save the cart
      await cart.save();
  
      res.status(200).json({ msg: "Product added to cart successfully", cart });
     
     }
     catch(error){
    res.status(500).json({ msg: "Internal server error", error: error.stack });
       
     }
  }

  exports.getCart = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Check if the user_id is valid, you can add your own validation logic here
  
      // Find the cart for the user
      const cart = await Cart.findOne({ user_id }).populate("products products.productId", "prod_name prod_price");
  
      if (!cart) {
        res.status(404).json({ msg: "Cart not found" });
      } else {
        res.status(200).json({ cart });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", error: error.stack });
    }
  };
  
  exports.removeFromCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const { user_id } = req.params;
  
      // Check if the user_id is valid, you can add your own validation logic here
       
      // Find the cart for the user
      const cart = await Cart.findOne({ user_id });
  
      if (!cart) {
        res.status(404).json({ msg: "Cart not found" });
        return; // Return to exit the function early if cart not found
      }
  
      // Remove the product from the cart
      cart.products = cart.products.filter((product) => product.productId.toString() !== productId);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ msg: "Product removed from cart successfully", cart });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", error: error.stack });
    }
  };