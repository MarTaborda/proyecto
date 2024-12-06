function abrirCarrito() {
    document.getElementById('carritoModal').style.display = 'block';
}

function cerrarCarrito() {
    document.getElementById('carritoModal').style.display = 'none';
}

// Asegúrate de que el modal se cierre si el usuario hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('carritoModal');
    if (event.target === modal) {
        cerrarCarrito();
    }
}