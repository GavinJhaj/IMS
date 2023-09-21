const express = require('express');
const router = express.Router();
const {
   getContact,
   postContact,
   getContactById
} = require('../controller/ContactController');

const {protect,admin}=require('../middleware/authMiddleware');

router.route('/').post(postContact).get(protect,admin,getContact);
router.route('/:id').get(protect, admin,getContactById );


module.exports = router;