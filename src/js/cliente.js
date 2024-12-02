// Obtiene el elemento con id 'mensaje' y lo asigna a la variable mensaje.
// Este elemento puede ser utilizado más adelante para mostrar mensajes al usuario.
let mensaje = document.getElementById('mensaje');

// Función para validar el formulario antes de enviar datos
function validarFormulario() {
    let valid = true; // Variable para controlar si el formulario es válido

    // Lista de campos que deben ser validados
    let fields = ['idCliente', 'nombre', 'genero', 'telefono', 'direccion'];
    fields.forEach(function(field) {
        // Selecciona el input correspondiente al campo actual
        let input = document.getElementById(field);
        // Selecciona el elemento de error asociado a este campo
        let error = document.getElementById(field + 'Error');
        
        // Verifica si el campo está vacío
        if (!input.value) {
            error.style.display = 'inline'; // Muestra el mensaje de error
            valid = false; // Marca el formulario como inválido
        } else {
            error.style.display = 'none'; // Oculta el mensaje de error si el campo es válido
        }
    });

    return valid; // Devuelve true si todos los campos son válidos, false en caso contrario
}

// Función para crear un cliente
function crearCliente() {
    // Llama a la función de validación y solo procede si el formulario es válido
    if(validarFormulario()) {
        // Obtiene los valores de los campos del formulario
        let idCliente = document.getElementById('idCliente').value;
        let nombre = document.getElementById('nombre').value;
        let genero = document.getElementById('genero').value;
        let telefono = document.getElementById('telefono').value;
        let direccion = document.getElementById('direccion').value;

        // Enviar datos al servidor usando fetch
        fetch('http://localhost:3000/clientes/crear', {
            method: 'POST', // Especifica que se está realizando una solicitud POST.
            headers: {
                'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
            },
            // Convierte el objeto de datos a una cadena JSON para enviarlo en el cuerpo de la solicitud
            body: JSON.stringify({ idCliente, nombre, genero, telefono, direccion })
        })
        .then(response => response.text()) // Convierte la respuesta a texto
        .then(data => {
            // Muestra un modal indicando que el cliente fue creado exitosamente
            mostrarModal('Cliente creado exitosamente');
            // Reinicia el formulario después de crear el cliente
            document.getElementById('clienteForm').reset();
        })
        .catch(error => {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error:', error); // Imprime el error en la consola
            mostrarModal('Error al crear el cliente'); // Muestra un mensaje de error al usuario
        });
    }
}

// Función para actualizar un cliente existente
function actualizarCliente() {
    // Obtiene los valores de los campos del formulario
    let idCliente = document.getElementById('idCliente').value;
    let nombre = document.getElementById('nombre').value;
    let genero = document.getElementById('genero').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccion').value;

    // Enviar datos al servidor usando fetch para actualizar el cliente
    fetch('http://localhost:3000/clientes/actualizar', {
        method: 'PUT', // Método HTTP para actualizar un recurso existente
        headers: {
            'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
        },
        // Convierte el objeto de datos a una cadena JSON para enviarlo en el cuerpo de la solicitud
        body: JSON.stringify({ idCliente, nombre, genero, telefono, direccion })
    })
    .then(response => response.text()) // Convierte la respuesta a texto
    .then(data => {
        // Muestra un modal indicando que el cliente fue actualizado exitosamente
        mostrarModal('Cliente actualizado exitosamente');
        // Reinicia el formulario después de actualizar el cliente
        document.getElementById('clienteForm').reset();
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle
        console.error('Error:', error); // Imprime el error en la consola
        mostrarModal('Error al crear el cliente'); // Muestra un mensaje de error al usuario
    });
}

// Función para buscar un cliente por su ID
function buscarCliente() {
    // Obtiene el ID del cliente a buscar desde el campo de entrada
    let idCliente = document.getElementById('idCliente').value;

    // Enviar solicitud al servidor usando fetch para buscar el cliente
    fetch(`http://localhost:3000/clientes/buscar/${idCliente}`)
    .then(response => {
        // Verifica si la respuesta es correcta (código de estado 200)
        if (!response.ok) {
            throw new Error('Cliente no encontrado'); // Lanza un error si el cliente no se encuentra
        }
        return response.json(); // Convierte la respuesta a JSON
    })
    .then(data => {
        // Comprueba si se recibió algún cliente en la respuesta
        if (data.length > 0) {
            let cliente = data[0]; // Asume que el primer elemento es el cliente buscado
            // Rellena los campos del formulario con los datos del cliente encontrado
            document.getElementById('nombre').value = cliente.nombre;
            document.getElementById('genero').value = cliente.genero;
            document.getElementById('telefono').value = cliente.telefono;
            document.getElementById('direccion').value = cliente.direccion;
        } else {
            // Si no se encuentra ningún cliente, muestra un mensaje al usuario
            mostrarModal('Cliente no encontrado');
            // Reinicia el formulario si no se encuentra el cliente
            document.getElementById('clienteForm').reset();
        }
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle
        console.error('Error:', error); // Imprime el error en la consola
        mostrarModal('Error al buscar el cliente'); // Muestra un mensaje de error al usuario
    });
}