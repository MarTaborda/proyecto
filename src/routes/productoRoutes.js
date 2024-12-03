// Importa el módulo express para crear un enrutador.
const express = require('express');
// Crea un nuevo enrutador utilizando express.Router().
const router = express.Router();




// Ruta para buscar un producto por su ID
router.get('/buscar/:idproducto', (req, res) => {
    // Extrae el ID del producto de los parámetros de la solicitud.
    const { idProducto } = req.params;

    // Define la consulta SQL para buscar un producto en la tabla 'producto' por su ID.
    const query = 'SELECT * FROM productos WHERE idproducto = ?';

    // Ejecuta la consulta en la base de datos utilizando la conexión proporcionada en la solicitud.
    req.connection.query(query, [idProducto], (err, result) => {
        // Manejo de errores: si hay un error en la consulta, lo imprime en la consola y responde con un estado 500.
        if (err) {
            console.error('Error al buscar producto:', err);
            res.status(500).send('Error al buscar producto');
            return; // Sale de la función si hay un error.
        }
        // Si la consulta se ejecuta correctamente, responde con el resultado en formato JSON.
        res.json(result);
    });
});

// Ruta para eliminar un producto por su ID
router.delete('/eliminar/:idProducto', (req, res) => {
    // Extrae el ID del producto de los parámetros de la solicitud.
    const { idProducto } = req.params;

    // Define la consulta SQL para eliminar un producto en la tabla 'producto' por su ID.
    const query = 'DELETE FROM producto WHERE idProducto = ?';

    // Ejecuta la consulta en la base de datos utilizando la conexión proporcionada en la solicitud.
    req.connection.query(query, [idProducto], (err, result) => {
        // Manejo de errores: si hay un error en la consulta, lo imprime en la consola y responde con un estado 500.
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).send('Error al eliminar producto');
            return; // Sale de la función si hay un error.
        }
        // Si la consulta se ejecuta correctamente, responde con un mensaje de éxito.
        res.send('Producto eliminado');
    });
});

// Ruta para obtener la lista de todos los productos
router.get('/lista', (req, res) => {
    // Define la consulta SQL para obtener todos los productos de la tabla 'producto'.
    const query = 'SELECT idProducto, nombre FROM producto';

    // Ejecuta la consulta en la base de datos utilizando la conexión proporcionada en la solicitud.
    req.connection.query(query, (err, result) => {
        // Manejo de errores: si hay un error en la consulta, lo imprime en la consola y responde con un estado 500.
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).send('Error al obtener productos');
            return; // Sale de la función si hay un error.
        }
        // Si la consulta se ejecuta correctamente, responde con el resultado en formato JSON.
        res.json(result);
    });
});

// Exporta el enrutador para ser utilizado en otras partes de la aplicación.
module.exports = router;