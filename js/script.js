let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botonesCarrito = document.querySelectorAll(".agregar-carrito");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", agregarAlCarrito);
});

function agregarAlCarrito(event) {
  const { id: productoId, nombre: productoNombre, precio: productoPrecio } = event.target.dataset;

  const producto = {
    id: productoId,
    nombre: productoNombre,
    precio: parseInt(productoPrecio),
    cantidad: 1,
  };

  const productoExistente = carrito.find((item) => item.id === productoId);

  productoExistente
    ? productoExistente.cantidad++
    : carrito.push({ ...producto });

  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));

  
  alertify.success(`${productoNombre} ha sido agregado al carrito.`);
}

function actualizarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  const carritoTotal = document.getElementById("carrito-total");

  carritoItems.innerHTML = "";

  let total = 0;

  carrito.forEach(({ nombre, cantidad, precio }) => {
    const productoElement = document.createElement("div");
    productoElement.classList.add("d-flex", "justify-content-between", "mb-2");
    productoElement.innerHTML = 
    `<span>${nombre} <strong>(${cantidad}un.)</strong></span>` + 
    `<span><strong>${(precio * cantidad).toFixed(2)}</strong></span>`;
    carritoItems.appendChild(productoElement);

    total += precio * cantidad;
  });

  if (!carrito.length) {
    carritoItems.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
  }

  carritoTotal.textContent = total.toFixed(2);
}


function vaciarCarrito() {
  carrito = []; 
  localStorage.removeItem("carrito"); 
  actualizarCarrito(); 
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

document.addEventListener("DOMContentLoaded", actualizarCarrito);