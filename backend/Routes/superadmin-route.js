const express = require('express');
const router = express.Router();
const superadminController = require('../Controllers/superadminController');

// Get a superadmin by ID
router.get('/:id', superadminController.getSuperadminById);

// Update a superadmin by ID
router.put('/:id', superadminController.updateSuperadmin);

// Login a superadmin
router.post('/login', superadminController.login);

// Forgot Password
router.post('/forgot-password', superadminController.forgotPassword);

// Reset Password
router.post('/reset-password', superadminController.resetPassword);

router.post('/send-registration-link', superadminController.sendRegistrationLink);

module.exports = router;
