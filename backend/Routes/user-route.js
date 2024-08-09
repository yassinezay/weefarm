const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Register a user after clicking the link
router.post('/register', userController.registerUser);

// Get all admins
router.get('/admins', userController.getAdmins);

// Activate a user
router.post('/activate/:id', userController.activateUser);

// Deactivate a user
router.post('/deactivate/:id', userController.deactivateUser);

// Update user information
router.put('/update/:id', userController.updateUser);

// Delete a user
router.delete('/delete/:id', userController.deleteUser);

router.get('/admin/:id', userController.getAdminById);


module.exports = router;
