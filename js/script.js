let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botonVaciarCarrito = document.getElementById("vaciar-carrito");
const botonCerrarCarrito = document.getElementById("cerrar-carrito");
const botonToggleCarrito = document.getElementById("toggleCarrito");

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

  Toastify({
    text: `${productoNombre} ha sido agregado al carrito.`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    close: true,
    style: {
      background: "linear-gradient(to right, rgba(0,176,155), rgba(255,128,0,0.9))",
      borderRadius: "8px",
    }
  }).showToast();

  const carritoSidebar = document.getElementById("carrito-sidebar");
  carritoSidebar.classList.add("show");
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
botonCerrarCarrito.addEventListener("click", () => {
  const carritoSidebar = document.getElementById("carrito-sidebar");
  carritoSidebar.classList.remove("show");
});

botonToggleCarrito.addEventListener("click", () => {
  const carritoSidebar = document.getElementById("carrito-sidebar");
  carritoSidebar.classList.toggle("show");
});


document.addEventListener("DOMContentLoaded", actualizarCarrito);
