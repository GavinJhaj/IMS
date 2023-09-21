const express = require('express');
const router = express.Router();

const {getAllproducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
} = require('../controller/PlayerController');


const {protect,admin}=require('../middleware/authMiddleware');

router.route('/').get(protect,getAllproducts).post(protect,admin,createProduct);
router.route('/:id').get(getSingleProduct)
.put(protect,admin,updateProduct)
.delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);

module.exports = router;

