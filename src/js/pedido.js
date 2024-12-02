// Obtiene el elemento con id 'mensaje' y lo asigna a la variable mensaje.
// Este elemento puede ser utilizado más adelante para mostrar mensajes al usuario.
let mensaje = document.getElementById('mensaje');

// Función que se ejecuta cuando el contenido del DOM ha sido completamente cargado.
// 'DOMContentLoaded' es un evento que se dispara cuando el documento HTML inicial ha sido completamente cargado y analizado.
document.addEventListener('DOMContentLoaded', () => {
    cargarClientes(); // Llama a la función para cargar la lista de clientes desde la base de datos.
    cargarProductos(); // Llama a la función para cargar la lista de productos desde la base de datos.
});

// Función para cargar clientes desde la base de datos.
function cargarClientes() {
    // Realiza una solicitud HTTP GET a la URL especificada para obtener la lista de clientes.
    fetch('http://localhost:3000/clientes/lista')
        .then(response => response.json()) // Convierte la respuesta del servidor a formato JSON.
        .then(data => {
            // Selecciona el elemento del DOM con el id 'idCliente', que es un <select> donde se mostrarán los clientes.
            let clienteSelect = document.getElementById('idCliente');
            
            // Agregar opción en blanco o con '--' para indicar que el usuario debe seleccionar un cliente.
            let defaultOption = document.createElement('option'); // Crea un nuevo elemento <option>.
            defaultOption.value = ''; // Establece el valor de la opción por defecto a vacío.
            defaultOption.text = '--'; // Establece el texto de la opción por defecto.
            clienteSelect.add(defaultOption); // Agrega la opción por defecto al elemento <select> de clientes.

            // Itera sobre cada cliente en la lista recibida desde la base de datos.
            data.forEach(cliente => {
                let option = document.createElement('option'); // Crea un nuevo elemento <option> para cada cliente.
                option.value = cliente.idCliente; // Establece el valor del cliente (ID) que se usará al enviar formularios.
                option.text = cliente.nombre; // Establece el texto que se mostrará en el <select>, que es el nombre del cliente.
                clienteSelect.add(option); // Agrega la opción del cliente al elemento <select>.
            });
        })
        .catch(error => {
            // Maneja cualquier error que ocurra durante la solicitud.
            console.error('Error al cargar clientes:', error); // Muestra el error en la consola para depuración.
        });
}

// Función para cargar productos desde la base de datos
function cargarProductos() {
    // Realiza una solicitud HTTP GET a la URL especificada para obtener la lista de productos.
    fetch('http://localhost:3000/productos/lista')
        .then(response => response.json()) // Convierte la respuesta del servidor a formato JSON.
        .then(data => {
            // Selecciona el elemento del DOM con el id 'idProducto', que es un <select> donde se mostrarán los productos.
            let productoSelect = document.getElementById('idProducto');
            
            // Agregar opción en blanco o con '--' para indicar que el usuario debe seleccionar un producto.
            let defaultOption = document.createElement('option'); // Crea un nuevo elemento <option>.
            defaultOption.value = ''; // Establece el valor de la opción por defecto a vacío, lo que significa que no se ha seleccionado nada.
            defaultOption.text = '--'; // Establece el texto de la opción por defecto, que se mostrará en el <select>.
            productoSelect.add(defaultOption); // Agrega la opción por defecto al elemento <select> de productos.
            
            // Itera sobre cada producto en la lista recibida desde la base de datos.
            data.forEach(producto => {
                let option = document.createElement('option'); // Crea un nuevo elemento <option> para cada producto.
                option.value = producto.idProducto; // Establece el valor del producto (ID) que se usará al enviar formularios.
                option.text = producto.nombre; // Establece el texto que se mostrará en el <select>, que es el nombre del producto.
                productoSelect.add(option); // Agrega la opción del producto al elemento <select>.
            });
        })
        .catch(error => {
            // Maneja cualquier error que ocurra durante la solicitud.
            console.error('Error al cargar productos:', error); // Muestra el error en la consola para depuración.
        });
}

// Función para crear un pedido
function crearPedido() {
    // Obtiene el valor del cliente ingresados en el formulario
    let idCliente = document.getElementById('idCliente').value;
    let idProducto = document.getElementById('idProducto').value;
    let cantidad = document.getElementById('cantidad').value;

    // Realiza una solicitud HTTP POST a la URL especificada para crear un nuevo pedido.
    fetch('http://localhost:3000/pedidos/crear', {
        method: 'POST', // Especifica que se está realizando una solicitud POST.
        headers: {
            'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud será en formato JSON.
        },
        // Convierte los datos del pedido (cliente, producto y cantidad) a formato JSON para enviarlos en el cuerpo de la solicitud.
        body: JSON.stringify({ idCliente, idProducto, cantidad })
    })
    .then(response => response.text()) // Convierte la respuesta del servidor a texto.
    .then(data => {
        // Muestra un mensaje de éxito al usuario indicando que el pedido se ha creado exitosamente.
        mostrarModal('Pedido creado exitosamente');        
        // Reinicia el formulario para que quede vacío después de crear el pedido.
        document.getElementById('pedidoForm').reset();
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle
        console.error('Error:', error); // Imprime el error en la consola para depuración.        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al crear el pedido.
        mostrarModal('Error al crear el pedido');
    });
}

// Función para actualizar un pedido
function actualizarPedido() {
    // Obtiene el valor del pedido ingresados en el formulario
    let idCliente = document.getElementById('idCliente').value;
    let idProducto = document.getElementById('idProducto').value;
    let cantidad = document.getElementById('cantidad').value;

    // Obtiene la fecha actual
    let fecha = new Date().toISOString(); // Se puede definir la fecha como la fecha actual en formato ISO.

    // Realiza una solicitud HTTP PUT a la URL especificada para actualizar un pedido existente.
    fetch('http://localhost:3000/pedidos/actualizar', {
        method: 'PUT', // Especifica que se está realizando una solicitud PUT, que se utiliza para actualizar recursos.
        headers: {
            'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud será en formato JSON.
        },
        // Convierte los datos del pedido (cliente, producto, fecha y cantidad) a formato JSON para enviarlos en el cuerpo de la solicitud.
        body: JSON.stringify({ idCliente, idProducto, fecha, cantidad })
    })
    .then(response => response.text()) // Convierte la respuesta del servidor a texto.
    .then(data => {
        // Muestra un mensaje de éxito al usuario indicando que el pedido se ha actualizado exitosamente.
        mostrarModal('Pedido actualizado exitosamente');        
        // Reinicia el formulario para que quede vacío después de actualizar el pedido.
        document.getElementById('pedidoForm').reset();
    })
    .catch(error => {
        // Maneja cualquier error que ocurra durante la solicitud.
        console.error('Error:', error); // Imprime el error en la consola para depuración.        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al actualizar el pedido.
        mostrarModal('Error al actualizar el pedido');
    });
}