// Obtiene el elemento con id 'mensaje' y lo asigna a la variable mensaje.
// Este elemento puede ser utilizado más adelante para mostrar mensajes al usuario.
let mensaje = document.getElementById('mensaje');

// Función para crear un producto
function crearProducto() {
    // Obtiene los valores de los campos del formulario de producto
    const idProducto = document.getElementById('idProducto').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;

    // Enviar datos al servidor usando fetch
    fetch('http://localhost:3000/productos/crear', {
        // Especifica que se está realizando una solicitud POST al servidor.
        method: 'POST',        
        // Define los encabezados de la solicitud.
        headers: {
            // Indica que el contenido de la solicitud será en formato JSON.
            'Content-Type': 'application/json'
        },        
        // Convierte los datos del producto (idProducto, nombre, descripcion y precio) a formato JSON
        // y los incluye en el cuerpo de la solicitud.
        body: JSON.stringify({ idProducto, nombre, descripcion, precio })
    })
    // Maneja la respuesta del servidor.
    .then(response => response.text()) // Convierte la respuesta a texto.
    .then(data => {
        // Si la creación del producto es exitosa, muestra un mensaje al usuario.
        mostrarModal('Producto creado exitosamente');        
        // Reinicia el formulario para que quede vacío después de crear el producto.
        document.getElementById('productoForm').reset();
    })
    .catch(error => {
        // Si ocurre un error durante la solicitud, lo imprime en la consola para depuración.
        console.error('Error:', error);        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al crear el producto.
        mostrarModal('Error al crear el producto');
    });
}

// Función para actualizar un producto
function actualizarProducto() {
    // Obtiene los valores de los campos del formulario de productos
    const idProducto = document.getElementById('idProducto').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;

    // Enviar datos al servidor usando fetch
    fetch('http://localhost:3000/productos/actualizar', {
        // Especifica que se está realizando una solicitud PUT al servidor.
        method: 'PUT',        
        // Define los encabezados de la solicitud.
        headers: {
            // Indica que el contenido de la solicitud será en formato JSON.
            'Content-Type': 'application/json'
        },        
        // Convierte los datos del producto (idProducto, nombre, descripcion y precio) a formato JSON
        // y los incluye en el cuerpo de la solicitud.
        body: JSON.stringify({ idProducto, nombre, descripcion, precio })
    })
    // Maneja la respuesta del servidor.
    .then(data => {
        // Si la actualización del producto es exitosa, muestra un mensaje al usuario.
        mostrarModal('Producto actualizado exitosamente');        
        // Reinicia el formulario para que quede vacío después de actualizar el producto.
        document.getElementById('productoForm').reset();
    })
    .catch(error => {
        // Si ocurre un error durante la solicitud, lo imprime en la consola para depuración.
        console.error('Error:', error);        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al actualizar el producto.
        mostrarModal('Error al actualizar el producto');
    });
}

// Función para buscar un producto
function buscarProducto() {
    // Obtiene el valor del campo de entrada con id 'idProducto' y lo almacena en la constante idProducto.
    const idProducto = document.getElementById('idProducto').value;

    // Enviar solicitud al servidor usando fetch
    // Se realiza una solicitud GET al servidor para buscar el producto con el ID especificado.
    fetch(`http://localhost:3000/productos/buscar/${idProducto}`)
    // Maneja la respuesta del servidor.
    .then(response => response.json()) // Convierte la respuesta en formato JSON.
    .then(data => {
        // Verifica si se encontraron productos en la respuesta.
        if (data.length > 0) {
            // Si se encontró al menos un producto, se toma el primero de la lista.
            const producto = data[0];
            
            // Asigna los valores del producto encontrado a los campos del formulario.
            document.getElementById('nombre').value = producto.nombre; // Establece el nombre del producto.
            document.getElementById('descripcion').value = producto.descripcion; // Establece la descripción del producto.
            document.getElementById('precio').value = producto.precio; // Establece el precio del producto.
        } else {
            // Si no se encontraron productos, muestra un mensaje indicando que el producto no fue encontrado.
            mostrarModal('Producto no encontrado');
        }
    })
    // Maneja cualquier error que ocurra durante la solicitud.
    .catch(error => {
        // Imprime el error en la consola para depuración.
        console.error('Error:', error);        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al buscar el producto.
        mostrarModal('Error al buscar el producto');
    });
}

// Función para eliminar un producto
function eliminarProducto() {
    // Obtiene el valor del campo de entrada con id 'idProducto' y lo almacena en la constante idProducto.
    const idProducto = document.getElementById('idProducto').value;

    // Enviar solicitud al servidor usando fetch
    // Se realiza una solicitud DELETE al servidor para eliminar el producto con el ID especificado.
    fetch(`http://localhost:3000/productos/eliminar/${idProducto}`, {
        // Especifica que se está realizando una solicitud DELETE.
        method: 'DELETE'
    })
    // Maneja la respuesta del servidor.
    .then(response => response.text()) // Convierte la respuesta a texto.
    .then(data => {
        // Si la eliminación del producto es exitosa, muestra un mensaje al usuario.
        mostrarModal('Producto eliminado exitosamente');        
        // Reinicia el formulario para que quede vacío después de eliminar el producto.
        document.getElementById('productoForm').reset();
    })
    .catch(error => {
        // Si ocurre un error durante la solicitud, lo imprime en la consola para depuración.
        console.error('Error:', error);        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al eliminar el producto.
        mostrarModal('Error al eliminar el producto');
    });
}