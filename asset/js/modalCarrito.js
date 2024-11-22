window.addEventListener("load", function () {
    const openCarrito = document.getElementById("icono-compra");

    if (openCarrito) {
        openCarrito.addEventListener("click", function () {
            // Verificar si ya existe el modal y el overlay
            let overlay = document.querySelector(".carrito-overlay");
            let contenedor = document.querySelector("#CModal");

            if (!overlay) {
                // Crear el fondo oscuro detrás del modal si no existe
                overlay = document.createElement("div");
                overlay.setAttribute("class", "carrito-overlay");
                document.body.appendChild(overlay);
            } else {
                overlay.style.display = "block"; // Mostrar si ya existe
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

                        // Acceder a los elementos después de que estén en el DOM
                        const closeBtn = contenedor.querySelector(".closeCarrito");
                        const vaciarBtn = contenedor.querySelector("#vaciarBtn");
                        const pagarBtn = contenedor.querySelector("#pagarBtn");
                        
                        // Vaciar el carrito al hacer clic en el botón
                        if (vaciarBtn) {
                            vaciarBtn.addEventListener("click", function () {
                                alert("vaciar carrito");
                            });
                        }

                        // Cerrar el modal al hacer clic en la "X"
                        if (closeBtn) {
                            closeBtn.addEventListener("click", function () {
                                contenedor.style.display = "none";
                                overlay.style.display = "none";
                            });
                        }

                        if (overlay) {
                            overlay.addEventListener("click", function () {
                                contenedor.style.display = "none";
                                overlay.style.display = "none";
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
