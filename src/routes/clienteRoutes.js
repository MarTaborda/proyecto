// Importar Express y crear una instancia de router
const express = require('express');
const router = express.Router();

/*
  Ruta: POST /crear
  Descripción: Crear un nuevo cliente en la base de datos
  Parámetros:
    - idCliente: número único que identifica al cliente
    - nombre: nombre del cliente
    - genero: género del cliente (opcional)
    - telefono: número de teléfono del cliente (opcional)
    - direccion: dirección del cliente (opcional)
*/
router.post('/crear', (req, res) => {
    // Destructurar los datos del cuerpo de la solicitud
    const { idCliente, nombre, genero, telefono, direccion } = req.body;

    // Consulta SQL de inserción
    const query = 'INSERT INTO cliente (idCliente, nombre, genero, telefono, direccion) VALUES (?, ?, ?, ?, ?)';

    // Ejecutar la consulta SQL con los datos proporcionados
    req.connection.query(query, [idCliente, nombre, genero, telefono, direccion], (err, result) => {
        if (err) {
            // Manejar errores en la consulta SQL
            console.error('Error al crear cliente:', err);
            res.status(500).send('Error al crear cliente');
            return;
        }

        // Enviar una respuesta indicando que el cliente ha sido creado
        res.send('Cliente creado');
    });
});

/*
  Ruta: PUT /actualizar
  Descripción: Actualizar los datos de un cliente en la base de datos
  Parámetros:
    - idCliente: número único que identifica al cliente
    - nombre: nombre del cliente (opcional)
    - genero: género del cliente (opcional)
    - telefono: número de teléfono del cliente (opcional)
    - direccion: dirección del cliente (opcional)
*/
router.put('/actualizar', (req, res) => {
    // Destructurar los datos del cuerpo de la solicitud
    const { idCliente, nombre, genero, telefono, direccion } = req.body;

    // Consulta SQL de actualización
    const query = 'UPDATE cliente SET nombre = ?, genero = ?, telefono = ?, direccion = ? WHERE idCliente = ?';

    // Ejecutar la consulta SQL con los datos proporcionados
    req.connection.query(query, [nombre, genero, telefono, direccion, idCliente], (err, result) => {
        if (err) {
            // Manejar errores en la consulta SQL
            console.error('Error al actualizar cliente:', err);
            res.status(500).send('Error al actualizar cliente');
            return;
        }

        // Enviar una respuesta indicando que el cliente ha sido actualizado
        res.send('Cliente actualizado');
    });
});

/*
  Ruta: GET /buscar/:idCliente
  Descripción: Buscar un cliente por su ID en la base de datos
  Parámetros:
    - idCliente: número único que identifica al cliente
*/
router.get('/buscar/:idCliente', (req, res) => {
    // Obtener el ID del cliente desde los parámetros de la solicitud
    const { idCliente } = req.params;

    // Consulta SQL de búsqueda
    const query = 'SELECT * FROM cliente WHERE idCliente = ?';

    // Ejecutar la consulta SQL con el ID del cliente
    req.connection.query(query, [idCliente], (err, result) => {
        if (err) {
            // Manejar errores en la consulta SQL
            console.error('Error al buscar cliente:', err);
            res.status(500).send('Error al buscar cliente');
            return;
        }

        // Enviar los datos del cliente como respuesta
        res.json(result);
    });
});

/*
  Ruta: DELETE /eliminar/:idCliente
  Descripción: Eliminar un cliente por su ID en la base de datos
  Parámetros:
    - idCliente: número único que identifica al cliente
*/
router.delete('/eliminar/:idCliente', (req, res) => {
    // Obtener el ID del cliente desde los parámetros de la solicitud
    const { idCliente } = req.params;

    // Consulta SQL de eliminación
    const query = 'DELETE FROM cliente WHERE idCliente = ?';

    // Ejecutar la consulta SQL con el ID del cliente
    req.connection.query(query, [idCliente], (err, result) => {
        if (err) {
            // Manejar errores en la consulta SQL
            console.error('Error al eliminar cliente:', err);
            res.status(500).send('Error al eliminar cliente');
            return;
        }

        // Enviar una respuesta indicando que el cliente ha sido eliminado
        res.send('Cliente eliminado');
    });
});

/*
  Ruta: GET /lista
  Descripción: Obtener una lista de todos los clientes en la base de datos
*/
router.get('/lista', (req, res) => {
    // Consulta SQL de lista
    const query = 'SELECT idCliente, nombre FROM cliente';

    // Ejecutar la consulta SQL
    req.connection.query(query, (err, result) => {
        if (err) {
            // Manejar errores en la consulta SQL
            console.error('Error al obtener clientes:', err);
            res.status(500).send('Error al obtener clientes');
            return;
        }

        // Enviar la lista de clientes como respuesta
        res.json(result);
    });
});

// Exportar el módulo router
module.exports = router;