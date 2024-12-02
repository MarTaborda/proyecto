// Función para mostrar el modal
function mostrarModal(mensaje) {
    // Establece el texto del elemento con id 'modalMensaje' al mensaje proporcionado.
    // Esto permite que el modal muestre un mensaje personalizado al usuario.
    document.getElementById('modalMensaje').innerText = mensaje;
    
    // Cambia el estilo de visualización del elemento con id 'modal' a 'block',
    // lo que hace que el modal sea visible en la pantalla.
    document.getElementById('modal').style.display = 'block';
    
    // Configura un temporizador que ejecutará la función después de 2000 milisegundos (2 segundos).
    setTimeout(() => {
        // Llama a la función cerrarModal para ocultar el modal.
        cerrarModal();
        
        // Redirige al usuario a la página 'inicio.html' después de cerrar el modal.
        window.location.href = 'inicio.html';
    }, 2000); // Redirigir después de 2 segundos
}

// Función para cerrar el modal
function cerrarModal() {
    // Cambia el estilo de visualización del elemento con id 'modal' a 'none',
    // lo que oculta el modal de la pantalla.
    document.getElementById('modal').style.display = 'none';
}