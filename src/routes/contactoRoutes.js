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
    

    // Inserción en la base de datos usando un query parametrizado
    const query = 'INSERT INTO contactos (nombre, celular, correo, mensaje) VALUES (?,?,?,?)';
    req.connection.query(query, [nombre, celular, correo, mensaje], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            
        }
        res.status(200).json({ alert: 'Contacto creado exitosamente.' });
    });
});


module.exports = router;