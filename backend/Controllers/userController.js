const bcrypt = require('bcrypt');
const { User } = require('../Models'); // Adjust the path as necessary
const { Op } = require('sequelize');

// Function to handle user registration after they click the link
const registerUser = async (req, res) => {
    try {
        const { token, password, fullname } = req.body;

        // Check if token, password, and fullname are provided
        if (!token || !password || !fullname) {
            return res.status(400).json({ message: 'Token, password, and full name are required' });
        }

        // Find the user with the provided token
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() } // Ensure the token is not expired
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password, activate the account, and set the full name
        user.password = hashedPassword;
        user.fullname = fullname; // Update this field as well
        user.isActive = true;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { registerUser };
