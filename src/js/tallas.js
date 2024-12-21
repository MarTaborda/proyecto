// Obtiene el elemento con id 'mensaje' y lo asigna a la variable mensaje.
// Este elemento puede ser utilizado más adelante para mostrar mensajes al usuario.
let mensaje = document.getElementById('mensaje');
let carrito = [];
let valorT = 0;


    // Función para obtener las tallas y llenar el select
    function cargarTallas() {
        console.log('Cargando tallas')
        document.getElementById('categoria').addEventListener('change', function() {
            const categoriaSeleccionada = this.value; // Obtiene el valor del select 'categoria'
        
            // Llama al servidor para obtener las tallas relacionadas con la categoría seleccionada
            fetch(`http://localhost:3000/tallas?categoria=${categoriaSeleccionada}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener las tallas');
                    }
                    return response.json();
                })
                .then(data => {
                    const selectTalla = document.getElementById('talla');
        
                    // Limpia las opciones actuales del select 'talla'
                    selectTalla.innerHTML = '<option value="" disabled selected>Selecciona tu talla</option>';
        
                    // Llena el select 'talla' con las opciones obtenidas
                    data.forEach(talla => {
                        const option = document.createElement('option');
                        option.value = talla.numerotalla; // Valor interno
                        option.textContent = talla.numerotalla; // Texto visible
                        selectTalla.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error al cargar las tallas:', error);
                });
        });
    }

    // Llama la función automáticamente al cargar la página
window.onload = function() {
    cargarTallas();
};