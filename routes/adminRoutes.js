// routes/userRoutes.js
const express = require('express');
const multer  = require('multer')

const { addCategory, getCategories, deleteCats, addProduct, addSubCats, getsubCategories, updateCats, updatesubCats, deltesubCats, getAllProducts, updateProducts, deleteProducts, getSingleProduct, deletesubCats } = require('../controllers/adminController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)

      const fileExtension = file.originalname.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      if (allowedExtensions.includes(fileExtension)) {
        cb(null, Date.now() + '_' + file.fieldname + '.' + fileExtension);
      } else {
        cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'));
      }
    }
  })
  
  const upload = multer({ storage: storage })

// Route for user registration
router.post('/cats', addCategory).get('/cats',getCategories);
router.put('/cats/:categoryId',updateCats).delete("/cats/:id",deleteCats);


router.post('/subcats',addSubCats).get('/subcats',getsubCategories);
router.put('/subcats/:subcatId',updatesubCats).delete('/subcats/:subcatId',deletesubCats);

router.post('/products',upload.single('prod_image'),addProduct).get('/products',getAllProducts).get('/products/:productId', getSingleProduct);
router.put('/products/:productId',upload.single("prod_image"), updateProducts).delete('/products/:productId', deleteProducts);



module.exports = router;
