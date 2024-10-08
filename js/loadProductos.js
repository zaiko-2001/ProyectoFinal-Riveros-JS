function mostrarProductos() { 
  const productosContainer = document.querySelector("#productos .row");

  productos.forEach((producto) => {
    const productoHTML = `
  <div class="col-lg-3 col-md-6 col-6 mb-4">
    <div class="card h-100">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
      <div class="card-body text-center">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text"><strong>$${producto.precio.toLocaleString("es-CL")}</strong></p>
        <button class="btn btn-outline-success mb-3 agregar-carrito" 
                data-id="${producto.id}" 
                data-nombre="${producto.nombre}" 
                data-precio="${producto.precio}">
          Agregar al Carrito
        </button>
        <button class="btn btn-outline-secondary ver-mas" 
                data-id="${producto.id}" 
                data-nombre="${producto.nombre}" 
                data-descripcion="${producto.descripcion}" 
                data-precio="${producto.precio}" 
                data-imagen="${producto.imagen}" 
                data-material="${producto.caracteristicas.material}" 
                data-tamaño="${producto.caracteristicas.tamaño}" 
                data-capacidad="${producto.caracteristicas.capacidad}" 
                data-bs-toggle="modal" 
                data-bs-target="#productModal">
          Ver más
        </button>
      </div>
    </div>
  </div>
`;


    productosContainer.insertAdjacentHTML("beforeend", productoHTML);
  });

  // Agregar los eventos a los botones de agregar al carrito
  const botonesCarrito = document.querySelectorAll(".agregar-carrito");
  botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });

  // Agregar los eventos a los botones de "Ver más"
  const botonesVerMas = document.querySelectorAll(".ver-mas");
  botonesVerMas.forEach((boton) => {
    boton.addEventListener("click", mostrarDetallesProducto);
  });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);

function mostrarDetallesProducto(event) {
  const { id, nombre, descripcion, precio, imagen, material, tamaño, capacidad } = event.target.dataset;

  // Llenar el contenido del modal con los datos del producto
  document.getElementById("productModalLabel").textContent = nombre;
  document.getElementById("modal-product-description").textContent = descripcion;
  document.getElementById("modal-product-price").innerHTML = `<strong>Precio: $${parseInt(precio).toLocaleString("es-CL")}</strong>`;
  document.getElementById("modal-product-image").src = imagen;

  // Llenar las características del producto
  const caracteristicasList = document.getElementById("modal-product-caracteristicas");
  caracteristicasList.innerHTML = `
    <li><strong>Material:</strong> ${material}</li>
    <li><strong>Tamaño:</strong> ${tamaño}</li>
    <li><strong>Capacidad:</strong> ${capacidad}</li>
  `;

  // Configurar el botón de agregar al carrito del modal
  const addToCartModalButton = document.getElementById("add-to-cart-modal");
  addToCartModalButton.dataset.id = id;
  addToCartModalButton.dataset.nombre = nombre;
  addToCartModalButton.dataset.precio = precio;

  // Agregar el evento al botón del modal para agregar el producto al carrito
  addToCartModalButton.onclick = function() {
    agregarAlCarrito({ target: addToCartModalButton });
  };
}
