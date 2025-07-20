const express = require('express');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
