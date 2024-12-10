// Importa el módulo express para crear un enrutador.
const express = require('express');
// Crea un nuevo enrutador utilizando express.Router().
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para obtener las tallas
router.get('/tallas', (req, res) => {
    const query = 'SELECT  numerotalla FROM tallas';
    req.connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las tallas:', err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
        res.status(200).json(results); // Envía las tallas como un array de objetos
    });
});

module.exports = router;