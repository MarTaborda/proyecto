// Importa el módulo express para crear un enrutador.
const express = require('express');
// Crea un nuevo enrutador utilizando express.Router().
const router = express.Router();

// Ruta para crear un nuevo pedido
router.post('/crear', (req, res) => {
    // Desestructura el cuerpo de la solicitud para obtener los detalles del pedido.
    const { idCliente, idProducto, cantidad } = req.body;

    // Obtiene la fecha actual en formato YYYY-MM-DD.
    const fecha = new Date().toISOString().split('T')[0];

    // Define la consulta SQL para insertar un nuevo pedido en la tabla 'pedido'.
    const query = 'INSERT INTO pedido (idCliente, idProducto, fecha, cantidad) VALUES (?, ?, ?, ?)';

    // Ejecuta la consulta en la base de datos utilizando la conexión proporcionada en la solicitud.
    req.connection.query(query, [idCliente, idProducto, fecha, cantidad], (err, result) => {
        // Manejo de errores: si hay un error en la consulta, lo imprime en la consola y responde con un estado 500.
        if (err) {
            console.error('Error al crear pedido:', err);
            res.status(500).send('Error al crear pedido');
            return; // Sale de la función si hay un error.
        }
        // Si la consulta se ejecuta correctamente, responde con un mensaje de éxito.
        res.send('Pedido creado');
    });
});

// Ruta para actualizar un pedido existente
router.put('/actualizar', (req, res) => {
    // Desestructura el cuerpo de la solicitud para obtener los detalles del pedido a actualizar.
    const { idCliente, idProducto, cantidad } = req.body;

    // Obtiene la fecha actual en formato YYYY-MM-DD.
    const fecha = new Date().toISOString().split('T')[0];

    // Define la consulta SQL para actualizar un pedido en la tabla 'pedido'.
    const query = 'UPDATE pedido SET cantidad = ?, fecha = ? WHERE idCliente = ? AND idProducto = ?';

    // Ejecuta la consulta en la base de datos utilizando la conexión proporcionada en la solicitud.
    req.connection.query(query, [cantidad, fecha, idCliente, idProducto], (err, result) => {
        // Manejo de errores: si hay un error en la consulta, lo imprime en la consola y responde con un estado 500.
        if (err) {
            console.error('Error al actualizar pedido:', err);
            res.status(500).send('Error al actualizar pedido');
            return; // Sale de la función si hay un error.
        }
        // Si la consulta se ejecuta correctamente, responde con un mensaje de éxito.
        res.send('Pedido actualizado');
    });
});

// Exporta el enrutador para ser utilizado en otras partes de la aplicación.
module.exports = router;