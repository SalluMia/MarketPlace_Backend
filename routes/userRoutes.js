// routes/userRoutes.js
const express = require('express');
const { registerUser,login,addcartProduct, removeFromCart, getCart } = require('../controllers/userController');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser).post('/login', login);


// cart
router.post('/products/:user_id',addcartProduct).get('/products/:user_id',getCart);
router.post('/removeCart/:user_id',removeFromCart)

module.exports = router;
