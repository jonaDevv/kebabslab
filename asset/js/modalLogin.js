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
                            overlay.style.display = "none"; // Ocultar el fondo oscuro
                            contenedor.remove();
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
                        logeoBtn.addEventListener("click", function() {

                            var usernameC=document.getElementById("username");
                            var passwordC=document.getElementById("password");
                            
                            if (validarLogin(usernameC, passwordC)){

                                var username = document.getElementById("username").value;
                                var password = document.getElementById("password").value;
                            }
                            //if (username && password) {
                                // Enviar datos al servidor
                                fetch("/Api/autentifica", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        username: username,
                                        password: password
                                    })
                                
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            // Mostrar el modal de inicio de sesión
                                            modal.style.display = "block";
                                            overlay.style.display = "block";
                                            
                                            // Mostrar mensaje de login exitoso
                                            var successMsg = document.getElementById("successMsg");
                                            successMsg.style.display = "block";
                                            
                                            // Mostrar mensaje de error
                                            var errorMsg = document.getElementById("errorMsg");
                                            errorMsg.style.display = "none";
                                        } else {
                                            // Mostrar mensaje de error
                                            var errorMsg = document.getElementById("errorMsg");
                                            errorMsg.style.display = "block";
                                            
                                            // Mostrar mensaje de login exitoso
                                            var successMsg = document.getElementById("successMsg");
                                            successMsg.style.display = "none";
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Error al enviar datos al servidor:", error);
                                    })
                                })

                            // } else {
                            //     // Mostrar mensaje de error
                            //     var errorMsg = document.getElementById("errorMsg"); 
                            // }

                            
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