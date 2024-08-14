const bcrypt = require('bcrypt');
const { User } = require('../Models'); // Adjust the path as necessary
const { Op } = require('sequelize');

// Function to handle user registration after they click the link
const registerUser = async (req, res) => {
    try {
        const { token, password, fullname } = req.body;

        if (!token || !password || !fullname) {
            return res.status(400).json({ message: 'Token, password, and full name are required' });
        }

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() } // Ensure the token is not expired
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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

// Define the route to get all admins, sorted by creation date (newest to oldest)
const getAdmins = async (req, res) => {
    try {
        const admins = await User.findAll({
            where: {
                role: 'admin'
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'fullname', 'email', 'isActive', 'role'] // Include 'role' here
        });
        
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to activate a user
const activateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isActive = 1;
        await user.save();
        res.status(200).json({ message: 'User activated' });
    } catch (error) {
        console.error('Error activating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to deactivate a user
const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isActive = 0;
        await user.save();
        res.status(200).json({ message: 'User deactivated' });
    } catch (error) {
        console.error('Error deactivating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, role } = req.body; // Include role in request body

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.fullname = fullname;
        user.email = email;
        user.role = role; // Update the role
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

// Function to get a specific admin by ID
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await User.findByPk(id, {
            attributes: ['id', 'fullname', 'email', 'isActive', 'role'] // Include fields you want to retrieve
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser, getAdmins, activateUser, deactivateUser, updateUser, deleteUser, getAdminById  };
