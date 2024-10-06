function mostrarProductos() {
  const productosContainer = document.querySelector("#productos .row");

  productos.forEach((producto) => {
    const productoHTML = `
       <div class="col-lg-3 col-md-6 col-6 mb-4">
  <div class="card h-100">
    <img src="${producto.imagen}" class="card-img-top" alt="${
      producto.nombre
    }" />
    <div class="card-body text-center">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${producto.descripcion}</p>
      <p class="card-text"><strong>$${producto.precio.toLocaleString(
        "es-CL"
      )}</strong></p>
      <button class="btn btn-secondary agregar-carrito" 
              data-id="${producto.id}" 
              data-nombre="${producto.nombre}" 
              data-precio="${producto.precio}">
        Agregar al Carrito
      </button>
    </div>
  </div>
</div>
      `;

    productosContainer.insertAdjacentHTML("beforeend", productoHTML);
  });

  const botonesCarrito = document.querySelectorAll(".agregar-carrito");
  botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
