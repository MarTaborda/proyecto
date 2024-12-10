// Obtiene el elemento con id 'mensaje' y lo asigna a la variable mensaje.
// Este elemento puede ser utilizado más adelante para mostrar mensajes al usuario.
let mensaje = document.getElementById('mensaje');
let carrito = [];
let valorT = 0;


    // Función para obtener las tallas y llenar el select
    function cargarTallas() {
        fetch('http://localhost:3000/tallas') // Asegúrate de usar la URL correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las tallas');
                }
                return response.json();
            })
            .then(data => {
                const select = document.getElementById('talla');
                data.forEach(talla => {
                    const option = document.createElement('option');
                    option.textContent = talla.numerotalla; // Verifica que el campo coincida con el nombre exacto de la columna
                    select.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar las tallas:', error);
            });
    }