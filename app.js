const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/userRoutes');

// Configuración de CORS
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

// Ruta raíz para pruebas
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// para swwager *correr estos comandos  npm install y npm install swagger-ui-express yamljs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'API_Doc.yaml'));
app.use('/API_Doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
