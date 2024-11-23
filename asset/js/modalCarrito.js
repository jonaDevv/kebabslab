window.addEventListener("load", function () {
    const openCarrito = document.getElementById("icono-compra");

    if (openCarrito) {
        openCarrito.addEventListener("click", function () {
            // Verificar si ya existe el modal y el overlay
            let overlayCar = document.querySelector(".carrito-overlay");
            let contenedor = document.querySelector("#CModal");

            if (!overlayCar) {
                // Crear el fondo oscuro detrás del modal si no existe
                overlayCar = document.createElement("div");
                overlayCar.setAttribute("class", "carrito-overlay");
                document.body.appendChild(overlayCar);

            } else {
                overlayCar.style.display = "block"; // Mostrar si ya existe
            }

            if (!contenedor) {
                // Crear el contenedor del modal si no existe
                contenedor = document.createElement("div");
                contenedor.setAttribute("id", "CModal");
                contenedor.setAttribute("class", "carritomodal");
                document.body.appendChild(contenedor);

                // Crear contenido del carrito
                fetch("/vistas/principal/carrito.html")
                    .then((respuesta) => respuesta.text())
                    .then((texto) => {
                        
                        contenedor.innerHTML = texto;
                        console.log(contenedor);
                        // Acceder a los elementos después de que estén en el DOM
                        const closeBtn = contenedor.querySelector(".closeCarrito");
                        const vaciarBtn = contenedor.querySelector("#vaciarBtn");
                        const pagarBtn = contenedor.querySelector("#pagarBtn");
                        
                       

                        rellenarCarrito();
                        
                        
                        // Vaciar el carrito al hacer clic en el botón
                        if (vaciarBtn) {
                            vaciarBtn.addEventListener("click", function () {
                                alert("vaciar carrito");
                            });
                        }

                        if (closeBtn) {
                            closeBtn.addEventListener("click", function () {
                                contenedor.remove();  // Elimina el modal
                                overlayCar.remove();  // Elimina el overlay
                            });
                        }
                        
                        if (overlayCar) {
                            overlayCar.addEventListener("click", function () {
                                contenedor.remove();  // Elimina el modal
                                overlayCar.remove();  // Elimina el overlay
                            });
                        }

                        // Evento del botón de pagar
                        if (pagarBtn) {
                            pagarBtn.addEventListener("click", function () {
                                alert("pagar");
                            });
                        }




                    })
                    .catch((error) => {
                        console.error("Error al cargar la plantilla del carrito:", error);
                    });
            } else {
                contenedor.style.display = "block"; // Mostrar si ya existe
            }
        });
    }
});
