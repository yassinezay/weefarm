const { Superadmin } = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('./nodemailerConfig');
const { Op } = require('sequelize'); // Import Op from Sequelize


const JWT_SECRET = '1234567';



// Get a superadmin by ID
const getSuperadminById = async (req, res) => {
    try {
        const superadmin = await Superadmin.findByPk(req.params.id);
        if (superadmin) {
            res.status(200).json(superadmin);
        } else {
            res.status(404).json({ error: 'Superadmin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a superadmin by ID
const updateSuperadmin = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const superadmin = await Superadmin.findByPk(req.params.id);
        if (superadmin) {
            if (password) {
                // Hash the new password before saving
                const hashedPassword = await bcrypt.hash(password, 10);
                superadmin.password = hashedPassword;
            }
            superadmin.fullname = fullname || superadmin.fullname;
            superadmin.email = email || superadmin.email;
            await superadmin.save();
            res.status(200).json(superadmin);   
        } else {
            res.status(404).json({ error: 'Superadmin not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const superadmin = await Superadmin.findOne({ where: { email } });

        if (!superadmin) {
            console.log('Login failed: Superadmin not found');
            return res.status(404).json({ message: 'Email or password invalid!' });
        }

        const validPass = bcrypt.compareSync(password, superadmin.password);

        if (!validPass) {
            console.log('Login failed: Invalid password');
            return res.status(404).json({ message: 'Email or password invalid!' });
        }

        const payload = {
            id: superadmin.id,
            email: superadmin.email,
            fullname: superadmin.fullname
        };

        const token = jwt.sign(payload, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const superadmin = await Superadmin.findOne({ where: { email } });

        if (!superadmin) {
            return res.status(404).json({ message: 'Superadmin not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        superadmin.resetPasswordToken = token;
        superadmin.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

        await superadmin.save();

        const resetUrl = `http://localhost:3000/auth/reset-password/${token}`;
        const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

        await sendEmail(superadmin.email, 'Password Reset Request', message);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Forgot Password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
      const { token, password } = req.body;
  
      const superadmin = await Superadmin.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [Op.gt]: Date.now() } // Ensure the token has not expired
        }
      });
  
      if (!superadmin) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Hash the new password
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Update password and clear the reset token and expiration
      superadmin.password = hashedPassword;
      superadmin.resetPasswordToken = null;
      superadmin.resetPasswordExpires = null;
  
      await superadmin.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Reset Password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = {
    getSuperadminById,
    updateSuperadmin,
    login,
    forgotPassword,
    resetPassword
};

