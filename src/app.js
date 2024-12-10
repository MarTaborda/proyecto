// Importa el módulo express para crear la aplicación web.
const express = require('express');
// Crea una instancia de la aplicación Express.
const app = express();
// Importa el módulo mysql2 para conectarse a la base de datos MySQL.
const mysql = require('mysql2');
// Se puede usar dotenv para cargar variables de entorno desde un archivo .env (actualmente comentado).
require('dotenv').config();
//const path = require('path');

// Importa las rutas de los clientes, productos y pedidos desde archivos externos.
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const contactoRoutes = require('./routes/contactoRoutes');

// Middleware: intercambiador de información 
// Middleware para analizar el cuerpo de las solicitudes JSON.
app.use(express.json());
// Middleware para servir archivos estáticos desde el directorio 'pag'.
app.use(express.static('HTML'));
// Middleware para servir archivos JavaScript desde 'src/js' bajo la ruta '/js'.
/* app.use('/CSS', express.static(path.join(__dirname, '../CSS')));
//app.use('/JS', express.static(path.join(__dirname, 'JS')));
// Middleware para servir archivos CSS desde 'src/css' bajo la ruta '/css'.
app.use('/JS', express.static(path.join(__dirname, '../JS')));
app.use('/JSS', express.static(path.join(__dirname, '/jss')));
//app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/IMAGENES', express.static(path.join(__dirname, '../IMAGENES')));
app.use('/HTML', express.static(path.join(__dirname, '../HTML')));
 */

app.use('/JS', express.static('src/js'));
app.use('/CSS', express.static('src/css'));
app.use('/IMAGENES', express.static('src/IMAGENES'));


// Ruta para servir el archivo HTML principal
/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../HMTL/HomePage.html'));
}); */

// Configuración de la conexión a la base de datos MySQL.
const connection = mysql.createConnection({
    host: 'localhost', // Dirección del servidor de la base de datos.
    user: 'root', // Nombre de usuario para conectarse a la base de datos.
    password: '12345', // Contraseña para el usuario de la base de datos.
    database: 'proyecto_dm' // Nombre de la base de datos a la que se va a conectar.
});

// Establece la conexión con la base de datos.
connection.connect((err) => {
    if (err) {
        // Si hay un error al conectarse, se imprime en la consola.
        console.error('Error conectando a la base de datos:', err);
        return; // Sale de la función si hay un error.
    }
    // Si la conexión es exitosa, se imprime un mensaje en la consola.
    console.log('Conectado a la base de datos MySQL');
});

// Middleware para pasar la conexión de la base de datos a las rutas.
app.use((req, res, next) => {
    req.connection = connection; // Asigna la conexión a la solicitud.
    next(); // Llama al siguiente middleware o ruta.
});

// Define las rutas de la aplicación utilizando los módulos importados.
app.use('/clientes', clienteRoutes); // Rutas para manejar clientes.
app.use('/productos', productoRoutes); // Rutas para manejar productos.
app.use('/pedidos', pedidoRoutes); // Rutas para manejar pedidos.
app.use('/contacto', contactoRoutes); // Rutas para manejar contactos.

// Establece el puerto en el que el servidor escuchará. Usa la variable de entorno PORT si está definida, o 3000 por defecto.
const port = process.env.PORT || 3000;
// Inicia el servidor y escucha en el puerto definido.
app.listen(port, () => {
    // Imprime un mensaje en la consola indicando que el servidor está corriendo.
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

