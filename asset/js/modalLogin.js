window.addEventListener("load", function() {

    const openModal = document.getElementById("openModal");

    if (openModal) {
        openModal.addEventListener("click", function() {

            // Crear el fondo oscuro detrás del modal
            var overlay = document.createElement("div");
            overlay.setAttribute("class", "modal-overlay");
            document.body.appendChild(overlay);

            // Crear el contenedor del modal
            var contenedor = document.createElement("div");
            contenedor.setAttribute("id", "loginModal");
            contenedor.setAttribute("class", "modal");
            document.body.appendChild(contenedor);
        
            var auxiliar = document.createElement("div");
        
            // Traer la plantilla del login
            fetch("/vistas/login/login.html")
                .then(respuesta => respuesta.text())
                .then(texto => {
                    auxiliar.innerHTML = texto;
                    contenedor.appendChild(auxiliar);
        
                    // Acceder a los elementos después de que estén en el DOM
                    var modal = document.getElementById("loginModal");
                    var closeBtn = document.getElementsByClassName("close")[0];
        
                    // Verifica si los elementos existen antes de agregar los eventos
                    if (modal && closeBtn) {
                        // Cerrar el modal al hacer clic en la "X"
                        closeBtn.addEventListener("click", function() {
                            modal.style.display = "none";
                            overlay.style.display = "none";
                            contenedor.remove(); // Elimina el modal del DOM
                        });
        
                        // Cerrar el modal al hacer clic fuera de su contenido
                        window.addEventListener("click", function(event) {
                            if (event.target == overlay) {
                                modal.style.display = "none";
                                overlay.style.display = "none"; // Ocultar el fondo oscuro
                                contenedor.remove();
                            }
                        });
                        
                        var logeoBtn = document.getElementById("logeo");
                        
                        logeoBtn.addEventListener("click", function(event) {
                            var loginForm = document.getElementById("loginForm");
                            loginForm.addEventListener("submit", function(event) {
                                event.preventDefault(); // Evitar el envío inmediato del formulario
    
                                // Obtener los datos del formulario
                                var username = document.getElementById("username");
                                var password = document.getElementById("password");
    
                                // Validación de los campos
                                if (validarLogin(username, password)) {
    
                                    // Si los campos son válidos, enviamos el formulario
                                    loginForm.submit(); // Enviar el formulario normalmente con el método POST
    
                                } else {
                                    alert("Por favor, completa todos los campos correctamente.");
                                }
                            });

                            
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


    }
});