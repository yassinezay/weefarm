const express = require('express');
const cors = require('cors');
const app = express();
const superadminRoutes = require('./Routes/superadmin-route');
const userRoutes = require('./Routes/user-route');

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json());
app.use('/superadmins', superadminRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
