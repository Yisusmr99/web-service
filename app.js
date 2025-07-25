const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Ruta raíz para pruebas
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'API_Doc.yaml'));
app.use('/API_Doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Servidor
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
