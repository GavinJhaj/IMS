const express = require('express');
const router = express.Router();

const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUsersById,
    deleteUsers,
    updateUsers,
    postResetPassword,
    setNewPassword,

} = require('../controller/UserController');

const {protect,admin}=require('../middleware/authMiddleware');


router.route('/').post(registerUser).get(protect,admin,getAllUsers);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').get(protect,admin,getUsersById).put(protect,admin,updateUsers).delete(protect,admin,deleteUsers);
router.post('/reset',postResetPassword);
router.post('/reset/:token',setNewPassword);



module.exports = router;