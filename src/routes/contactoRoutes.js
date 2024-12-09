// Importa el módulo express para crear un enrutador.
const express = require('express');
// Crea un nuevo enrutador utilizando express.Router().
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para crear un nuevo producto
router.post('/crear', (req, res) => {
    // Desestructura el cuerpo de la solicitud para obtener los detalles del producto.
    const { nombre, celular, correo, mensaje } = req.body;

    // Define la consulta SQL para insertar un nuevo producto en la tabla 'producto'.
    const query = 'INSERT INTO contactos (nombre, celular, correo, mensaje) VALUES (?, ?, ?, ?)';

    // Ejecuta la consulta en la base de datos utilizando la conexión proporcionada en la solicitud.
    req.connection.query(query, [nombre, celular, correo, mensaje], (err, result) => {
        // Manejo de errores: si hay un error en la consulta, lo imprime en la consola y responde con un estado 500.
        if (err) {
            console.error('Error al crear contacto:', err.message);
            res.status(500).send('Error al crear contacto');
            return; // Sale de la función si hay un error.
        }
        // Si la consulta se ejecuta correctamente, responde con un mensaje de éxito.
        res.send('contacto creado');
    });
});
module.exports = router;