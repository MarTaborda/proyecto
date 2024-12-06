// Obtiene el elemento con id 'mensaje' y lo asigna a la variable mensaje.
// Este elemento puede ser utilizado más adelante para mostrar mensajes al usuario.
let mensaje = document.getElementById('mensaje');
let carrito = [];
let valorT = 0;

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
function buscarProducto(categoria) {
    //busca los productos por categoria para que lo haga de manera dinamica

    // Enviar solicitud al servidor usando fetch
    // Se realiza una solicitud GET al servidor para buscar el producto con el ID especificado.
    fetch(`http://localhost:3000/productos/buscar/${categoria}`)
    // Maneja la respuesta del servidor.
    .then(response => response.json()) // Convierte la respuesta en formato JSON.
    .then(data => {
        //llama la funcion que genera el codigo html de los productos
        renderProducts(data,categoria);
    })
    // Maneja cualquier error que ocurra durante la solicitud.
    .catch(error => {
        // Imprime el error en la consola para depuración.
        console.error('Error:', error);        
        // Muestra un mensaje de error al usuario indicando que hubo un problema al buscar el producto.
    });
}

function renderProducts(productos,categoria) {
    const container = document.getElementById('gallery'); // Asegúrate de tener un contenedor en tu HTML
    let car_categoria = "";

    //Realiza un switch para que con el id de la categoria genere el nombre de la carpeta
    switch (categoria) {
        case 1:
            car_categoria = "NIÑAS";
            break; // Asegúrate de usar break para evitar fall-through
        case 2:
            car_categoria = "NIÑOS";
            break; // Asegúrate de usar break para evitar fall-through
        case 3:
            car_categoria = "DAMAS";
            break; // Asegúrate de usar break para evitar fall-through
        case 4:
            car_categoria = "CABALLEROS";
            break; // Asegúrate de usar break para evitar fall-through
        default:
            car_categoria = "OTROS"; // Valor por defecto si no coincide con ningún caso
            break;
    }
    productos.forEach(producto => {
        // Crear el div del producto
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const imagePath = `/IMAGENES/CATEGORIAS/${car_categoria}/${producto.idproducto}.jpg`;
        // Crear el contenido del producto
        productDiv.innerHTML = `
            <img src="${imagePath}">
            <h3>${producto.nombre_producto}</h3>
          <div class="controls">
            <label for="precio">Precio:</label>
            <span id="precio-label">${producto.precio}</span> <br>
            <br>
            <br>   
            <label for="cantidad">Cantidad:</label>
            <input type="number" min="0" value="1" id="cantidad${producto.idproducto}"> <!-- Input para la cantidad -->
            <button id="agregar" onclick="agregarCarrito({ id: '${producto.idproducto}', nombre_producto: '${producto.nombre_producto}', precio: ${producto.precio}})">Agregar al carrito</button>
            </div>
            
            <select id="talla" name="talla">
                <option value="" disabled selected>Selecciona tu talla</option>
                <option value="">--</option>)
            </select>
        `;

        // Agregar el div del producto al contenedor
        container.appendChild(productDiv);
    });
}

function agregarCarrito(producto)
{
    let valor = 0;
    const cantidad = parseInt(document.getElementById('cantidad'+producto.id).value, 10);
    if(isNaN(cantidad) || cantidad <= 0){
        alert("Por favor, ingresar una cantidad valida");
        return;
    }

    const index = carrito.findIndex(item => item.id == producto.id );
    console.log(producto);
    console.log(carrito);
    alert(index);
    if (index != -1){
        carrito[index].cantidad += cantidad;
        valor += (producto.precio * cantidad);
    }else{
        carrito.push({...producto,cantidad})
        valor += (producto.precio * cantidad);
    }
    valorT += valor;
    actualizarContadorCarrito();
    mostrarCarrito();
    
}

function mostrarCarrito(){
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = '';
    carrito.forEach(item =>{
        carritoDiv.innerHTML += `
            <div>
                <h5>${item.nombre_producto} - ${item.precio} - ${item.cantidad}</h5>
            </div>
        `;
    });
    document.getElementById("valorT").innerText = valorT;
    document.getElementById("carritoModal").style.display = 'block';
}

function actualizarContadorCarrito() {
    // Calcula la cantidad total de productos en el carrito
    cartCount = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    // Actualiza el contador en el HTML
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount; // Actualiza el texto del contador
}
function limpiarCarrito() {
    carrito = []; // Vaciar el carrito
    cartCount = 0; // Reiniciar el contador

    // Actualizar el contador en el HTML
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount; // Actualiza el texto del contador

    // Opcional: Mostrar un mensaje de confirmación
    alert("El carrito ha sido limpiado.");
    
    // Opcional: Llamar a mostrarCarrito si tienes una función para mostrar el contenido del carrito
    mostrarCarrito();
}



/* function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoBody = document.getElementById('carrito-body');
    const totalSpan = document.getElementById('total');
    
    // Limpiar contenido previo
    carritoBody.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
                <input type="number" class="cantidad" value="${item.cantidad}" min="1" data-index="${index}">
            </td>
            <td>${item.talla}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <span class="material-icons eliminar" data-index="${index}">delete</span>
            </td>
        `;
        carritoBody.appendChild(row);
    });

    totalSpan.textContent = total.toFixed(2);

    // Agregar eventos para actualizar cantidades y eliminar productos
    document.querySelectorAll('.cantidad').forEach(input => {
        input.addEventListener('change', actualizarCantidad);
    });
    document.querySelectorAll('.eliminar').forEach(icon => {
        icon.addEventListener('click', eliminarProducto);
    });
} */

function actualizarCantidad(event) {
    const index = event.target.dataset.index;
    const nuevaCantidad = parseInt(event.target.value);
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (nuevaCantidad > 0) {
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    } else {
        alert("La cantidad debe ser mayor a 0.");
        renderizarCarrito();
    }
}

function eliminarProducto(event) {
    const index = event.target.dataset.index;
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminar producto del carrito
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Renderizar el carrito al cargar la página
//renderizarCarrito();




// Seleccionar el botón del carrito
/* const botonCarrito = document.getElementById('ver-carrito');
 */
// Redirigir al carrito al hacer clic
/* botonCarrito.addEventListener('click', () => {
    window.location.href = 'carrito.html';
}); */





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