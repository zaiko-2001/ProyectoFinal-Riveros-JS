function loadProductos() {
  const productosContainer = document.querySelector("#productos .row");

  fetch("js/productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de productos");
      }
      return response.json();
    })
    .then((productos) => {
    
      if (!Array.isArray(productos) || productos.length === 0) {
        productosContainer.innerHTML = '<p class="text-center">No hay productos disponibles.</p>';
        return;
      }

      
      productos.forEach((producto) => {
         const { id, nombre, descripcion, precio, imagen, caracteristicas } = producto; 
        const productoHTML = `
          <div class="col-lg-3 col-md-6 col-6 mb-4">
            <div class="card h-100">
              <img src="${imagen}" class="card-img-top" alt="${nombre}" />
              <div class="card-body text-center">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text"><strong>$${precio.toLocaleString("es-CL")}</strong></p>
                <button class="btn boton-compra mb-3 agregar-carrito" data-id="${id}" data-nombre="${nombre}" data-precio="${precio}">Agregar al Carrito</button>
                <button class="btn btn-vermas ver-mas" data-id="${id}" data-nombre="${nombre}" data-bs-toggle="modal" data-bs-target="#productModal">Ver más</button>
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

      const botonesVerMas = document.querySelectorAll(".ver-mas");
      botonesVerMas.forEach((boton) => {
        boton.addEventListener("click", mostrarDetallesProducto);
      });
    })
    .catch((error) => console.error("Error al cargar los productos:", error));
}

document.addEventListener("DOMContentLoaded", loadProductos);

async function mostrarDetallesProducto(event) {
  const productId = event.target.dataset.id; 

  try {
    const response = await fetch(`js/productos.json`);

    if (!response.ok) {
      throw new Error("Error al cargar el archivo de productos");
    }

    const productos = await response.json();
    const product = productos.find(producto => producto.id === parseInt(productId)); // Find product by ID

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    renderProductModal(product); 
  

  } catch (error) {
    console.error("Error al mostrar detalles del producto:", error);
   
  }
}

function renderProductModal(product) {
  const { id, nombre, descripcion, precio, imagen, material, tamaño, capacidad } = product;

  document.getElementById("productModalLabel").textContent = nombre;
  document.getElementById("modal-product-description").textContent = descripcion;
  document.getElementById("modal-product-price").innerHTML = `<strong>Precio: $${parseInt(precio).toLocaleString("es-CL")}</strong>`;
  document.getElementById("modal-product-image").src = imagen;

  const caracteristicasList = document.getElementById("modal-product-caracteristicas");
  caracteristicasList.innerHTML = `
    <li><strong>Material:</strong> ${material}</li>
    <li><strong>Tamaño:</strong> ${tamaño}</li>
    <li><strong>Capacidad:</strong> ${capacidad}</li>
  `;

  const addToCartModalButton = document.getElementById("add-to-cart-modal");
  addToCartModalButton.dataset.id = id;
  addToCartModalButton.dataset.nombre = nombre;
  addToCartModalButton.dataset.precio = precio;

  addToCartModalButton.onclick = function() {
    agregarAlCarrito({ target: addToCartModalButton });
  };
}