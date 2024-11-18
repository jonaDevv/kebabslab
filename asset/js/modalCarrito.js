window.addEventListener("load", function() {

    const openModal = document.getElementById("icono-compra");

    if (openModal) {
        openModal.addEventListener("click", function() {

            // Crear el fondo oscuro detrás del modal
            var overlay = document.createElement("div");
            overlay.setAttribute("class", "carrito-overlay");
            document.body.appendChild(overlay);

            // Crear el contenedor del modal
            var contenedor = document.createElement("div");

            contenedor.setAttribute("id", "CModal");
            contenedor.setAttribute("class", "carritomodal");
            document.body.appendChild(contenedor);
        
            var auxiliar = document.createElement("div");
        
            // Traer la plantilla del carrito
            fetch("/vistas/principal/carrito.html")
                .then(respuesta => respuesta.text())
                .then(texto => {
                    auxiliar.innerHTML = texto;
                    contenedor.appendChild(auxiliar);

                    carrito=document.getElementById("carrito");
                    contenedor.appendChild(carrito);
        
                    // Acceder a los elementos después de que estén en el DOM
                    var modal = document.getElementById("CModal");
                    var closeBtn = document.getElementsByClassName("closeCarrito")[0];
                    var vaciarBtn = document.getElementById("vaciarBtn");
                    var pagarBtn = document.getElementById("pagarBtn");

                    if (vaciarBtn) {
                        // Vaciar el carrito al hacer clic en el botón
                        vaciarBtn.addEventListener("click", function() {
                            carrito.innerHTML = "0";
                            
                        });
                    }
                    // Verifica si los elementos existen antes de agregar los eventos
                    if (closeBtn) {
                        // Cerrar el modal al hacer clic en la "X"
                        closeBtn.addEventListener("click", function() {
                            modal.style.display = "none";
                            overlay.style.display = "none"; // Ocultar el fondo oscuro
                            contenedor.remove();
                        });
        
                        
                        
                        
                        // Mostrar el modal y el fondo oscuro
                        modal.style.display = "block";
                        overlay.style.display = "block";
                    } else {
                        console.error("No se han encontrado los elementos del modal.");
                    }


                    

                })
                .catch(error => {
                    console.error("Error al cargar la plantilla del login:", error);
                });





        });


    } else {
        console.error("Los elementos no están disponibles.");
    }
});