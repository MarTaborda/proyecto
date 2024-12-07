// Función para crear un pedido
function crearContacto() {
    // Obtiene el valor del cliente ingresados en el formulario
    let nombre = document.getElementById('nombre').value;
    let celular = document.getElementById('celular').value;
    let correo = document.getElementById('correo').value;
    let mensaje = document.getElementById('mensaje').value;

    // Realiza una solicitud HTTP POST a la URL especificada para crear un nuevo pedido.
    fetch('http://localhost:3000/contacto/crear', {
        method: 'POST', // Especifica que se está realizando una solicitud POST.
        headers: {
            'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud será en formato JSON.
        },
        // Convierte los datos del pedido (cliente, producto y cantidad) a formato JSON para enviarlos en el cuerpo de la solicitud.
        body: JSON.stringify({ nombre, celular, correo, mensaje })
    })
    .then(response => response.text()) // Convierte la respuesta del servidor a texto.
    .then(data => {
        // Muestra un mensaje de éxito al usuario indicando que el pedido se ha creado exitosamente.
        mostrarModal('Se envio su información de forma corrrecta');        
        // Reinicia el formulario para que quede vacío después de crear el pedido.
        document.getElementById('formulario').reset();
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle
        console.error('Error:', error); // Imprime el error en la consola para depuración.        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al crear el pedido.
        mostrarModal('Error al crear el formulario');
    });
}
