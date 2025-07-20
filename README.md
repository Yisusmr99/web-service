# Web Service - API REST con Node.js y MySQL

Un servicio web RESTful desarrollado con Node.js, Express y MySQL que proporciona operaciones CRUD para la gestión de usuarios.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Base de Datos](#base-de-datos)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)

## ✨ Características

- API RESTful para gestión de usuarios
- Conexión a base de datos MySQL con pool de conexiones
- Arquitectura MVC (Modelo-Vista-Controlador)
- Variables de entorno para configuración
- Manejo de errores
- Endpoints para obtener y crear usuarios

## 🛠 Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MySQL** - Sistema de gestión de base de datos
- **mysql2** - Cliente MySQL para Node.js con soporte para Promises
- **dotenv** - Carga variables de entorno desde archivo .env

## 📁 Estructura del Proyecto

```
web-service/
├── app.js                 # Punto de entrada de la aplicación
├── package.json           # Dependencias y scripts del proyecto
├── .env                   # Variables de entorno (no incluir en git)
├── config/
│   └── db.js             # Configuración de la base de datos
├── controllers/
│   └── userController.js # Lógica de negocio para usuarios
├── models/
│   └── userModel.js      # Modelo de datos para usuarios
└── routes/
    └── userRoutes.js     # Definición de rutas para usuarios
```

## 📋 Prerrequisitos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (versión 5.7 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## 🚀 Instalación

1. **Clona el repositorio** (o descarga los archivos):
   ```bash
   git clone <url-del-repositorio>
   cd web-service
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

## ⚙️ Configuración

1. **Configura las variables de entorno**:
   
   El archivo `.env` ya está incluido en el proyecto. Modifica los valores según tu configuración:
   
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_db
   DB_PORT=3306
   PORT=3000
   ```

   > ⚠️ **Importante**: En un entorno de producción, nunca incluyas el archivo `.env` en el control de versiones. Añádelo al `.gitignore`.

## 🗄️ Base de Datos

1. **Crea la base de datos en MySQL**:
   ```sql
   CREATE DATABASE nombre_db;
   USE nombre_db;
   ```

2. **Crea la tabla de usuarios**:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **(Opcional) Inserta datos de prueba**:
   ```sql
   INSERT INTO users (name, email) VALUES 
   ('Juan Pérez', 'juan@email.com'),
   ('María García', 'maria@email.com');
   ```

## 🎯 Uso

1. **Inicia el servidor**:
   ```bash
   node app.js
   ```

2. **El servidor estará disponible en**:
   ```
   http://localhost:3000
   ```

3. **Verifica que el servidor esté funcionando**:
   Deberías ver el mensaje: `Servidor corriendo en http://localhost:3000`

## 📡 API Endpoints

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Obtiene todos los usuarios |
| POST | `/api/users` | Crea un nuevo usuario |

### Detalles de los Endpoints

#### GET /api/users
Obtiene la lista de todos los usuarios.

**Respuesta exitosa (200):**
```json
[
    {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@email.com",
        "created_at": "2025-01-20T10:30:00.000Z"
    }
]
```

#### POST /api/users
Crea un nuevo usuario.

**Body de la petición:**
```json
{
    "name": "Nuevo Usuario",
    "email": "nuevo@email.com"
}
```

**Respuesta exitosa (201):**
```json
{
    "id": 3,
    "name": "Nuevo Usuario",
    "email": "nuevo@email.com"
}
```

## 🧪 Ejemplos de Uso

### Usando cURL

**Obtener todos los usuarios:**
```bash
curl -X GET http://localhost:3000/api/users
```

**Crear un nuevo usuario:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ana López", "email": "ana@email.com"}'
```

### Usando JavaScript (fetch)

**Obtener usuarios:**
```javascript
fetch('http://localhost:3000/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Crear usuario:**
```javascript
fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Carlos Ruiz',
    email: 'carlos@email.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🔧 Configuración Avanzada

### Pool de Conexiones MySQL

El proyecto utiliza un pool de conexiones con la siguiente configuración:
- **connectionLimit**: 10 conexiones simultáneas máximo
- **waitForConnections**: true (espera conexiones disponibles)
- **queueLimit**: 0 (sin límite en la cola)

### Scripts de Package.json

Puedes agregar scripts útiles al `package.json`:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

Para usar `nodemon` (desarrollo con auto-reload):
```bash
npm install -D nodemon
npm run dev
```

## 🚨 Manejo de Errores

El servicio incluye manejo básico de errores:
- Errores de base de datos retornan status 500
- Respuestas JSON con mensajes de error descriptivos

## 🔒 Consideraciones de Seguridad

Para un entorno de producción, considera implementar:
- Validación de entrada de datos
- Autenticación y autorización
- Rate limiting
- CORS (Cross-Origin Resource Sharing)
- Sanitización de datos
- Logs de seguridad

## 📝 Notas Adicionales

- El servidor utiliza `express.json()` para parsear peticiones JSON
- La configuración de la base de datos se carga desde variables de entorno
- El proyecto sigue el patrón MVC para una mejor organización del código
- Se utiliza async/await para operaciones asíncronas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
