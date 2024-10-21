document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los elementos importantes
    const imagenesProductos = document.querySelectorAll(".producto img");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalImage = document.getElementById("modal-image");
    const cerrarModal = document.querySelector(".close");
    const confirmarAgregarCarrito = document.getElementById("confirmar-agregar-carrito");
    const botonPagar = document.getElementById("pagar");
    const seccionPago = document.getElementById("pago");
    const confirmarPago = document.getElementById("confirmar-pago");
    const metodoPago = document.getElementById("metodo-pago");
    const datosTarjeta = document.getElementById("datos-tarjeta");
    const datosEfectivo = document.getElementById("datos-efectivo");
    const efectivoRecibido = document.getElementById("efectivo-recibido");
    const cambio = document.getElementById("cambio");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    let totalCarrito = 0;
    let productoSeleccionado = null;

    // Función para abrir el modal con la información del producto
    const abrirModal = (producto) => {
        productoSeleccionado = producto;
        modalTitle.textContent = producto.dataset.name;
        modalDescription.textContent = producto.dataset.description;
        modalPrice.textContent = `Precio: $${producto.dataset.price}`;
        modalImage.src = producto.querySelector("img").src; // Asigna la imagen del producto al modal
        modal.style.display = "block";
    };

    // Función para cerrar el modal
    const cerrarModalFunc = () => {
        modal.style.display = "none";
        productoSeleccionado = null; // Reinicia el producto seleccionado al cerrar el modal
    };

    // Asignar eventos a todas las imágenes de productos
    imagenesProductos.forEach(imagen => {
        imagen.addEventListener("click", (e) => {
            const producto = e.target.closest(".producto");
            abrirModal(producto);
        });
    });

    // Cerrar el modal al hacer clic en la 'X'
    cerrarModal.addEventListener("click", cerrarModalFunc);

    // Funcionalidad para añadir el producto al carrito desde el modal
    confirmarAgregarCarrito.addEventListener("click", () => {
        if (productoSeleccionado) {
            const nombre = productoSeleccionado.dataset.name;
            const precio = parseFloat(productoSeleccionado.dataset.price);
            const nuevoItem = document.createElement("li");
            nuevoItem.textContent = `${nombre} - $${precio.toFixed(2)}`;
            listaCarrito.appendChild(nuevoItem);

            // Actualizar el total
            totalCarrito += precio;
            totalElemento.textContent = `Total: $${totalCarrito.toFixed(2)}`;

            cerrarModalFunc(); // Cierra el modal
        }
    });

    // Funcionalidad para el botón de "Finalizar Compra"
    botonPagar.addEventListener("click", () => {
        if (totalCarrito > 0) {
            document.getElementById("monto-a-pagar").textContent = `Total a Pagar: $${totalCarrito.toFixed(2)}`;
            seccionPago.style.display = "block"; // Muestra la sección de pago
            document.getElementById("carrito").style.display = "none"; // Oculta el carrito
        } else {
            alert('El carrito está vacío.');
        }
    });

    // Mostrar campos según el método de pago seleccionado
    metodoPago.addEventListener("change", (e) => {
        const metodo = e.target.value;
        if (metodo === "tarjeta") {
            datosTarjeta.style.display = "block";
            datosEfectivo.style.display = "none";
            cambio.style.display = "none"; // Reiniciar el cambio
            efectivoRecibido.value = ""; // Reiniciar el valor
        } else if (metodo === "efectivo") {
            datosTarjeta.style.display = "none";
            datosEfectivo.style.display = "block";
            cambio.style.display = "none"; // Reiniciar el cambio
            efectivoRecibido.value = ""; // Reiniciar el valor
        } else {
            datosTarjeta.style.display = "none";
            datosEfectivo.style.display = "none";
            cambio.style.display = "none"; // Reiniciar el cambio
            efectivoRecibido.value = ""; // Reiniciar el valor
        }
    });

    // Funcionalidad para confirmar el pago
    confirmarPago.addEventListener("click", () => {
        const metodo = metodoPago.value;
        if (metodo === "tarjeta") {
            // Aquí puedes realizar la lógica para el pago con tarjeta
            alert('Pago con tarjeta procesado.');
            reiniciarCarrito(); // Reiniciar el carrito al procesar el pago
        } else if (metodo === "efectivo") {
            const dineroRecibido = parseFloat(efectivoRecibido.value);
            if (!isNaN(dineroRecibido) && dineroRecibido >= totalCarrito) {
                const cambioAmount = dineroRecibido - totalCarrito;
                cambio.textContent = `Cambio: $${cambioAmount.toFixed(2)}`;
                cambio.style.display = "block"; // Muestra el cambio
                alert(`Pago en efectivo procesado. Monto recibido: $${dineroRecibido.toFixed(2)}. Cambio: $${cambioAmount.toFixed(2)}`);
                reiniciarCarrito(); // Reiniciar el carrito al procesar el pago
            } else {
                alert('Por favor, introduce un monto válido o insuficiente.');
            }
        } else {
            alert('Por favor, selecciona un método de pago.');
        }
    });

    // Función para reiniciar el carrito
    const reiniciarCarrito = () => {
        // Limpiar la lista de productos en el carrito
        listaCarrito.innerHTML = '';
        totalCarrito = 0; // Reiniciar el total
        totalElemento.textContent = 'Total: $0.00'; // Reiniciar el total mostrado
        seccionPago.style.display = 'none'; // Ocultar la sección de pago
        document.getElementById("carrito").style.display = "block"; // Volver a mostrar el carrito
    };
});
