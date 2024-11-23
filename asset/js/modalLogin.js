window.addEventListener("load", function () {
    // Crear el modal y el overlay al cargar la página
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "modal-overlay");
    overlay.setAttribute("id", "modalOverlay");
    overlay.style.display = "none"; // Ocultar inicialmente
    document.body.appendChild(overlay);

    const contenedor = document.createElement("div");
    contenedor.setAttribute("id", "loginModal");
    contenedor.setAttribute("class", "modal");
    contenedor.style.display = "none"; // Ocultar inicialmente
    document.body.appendChild(contenedor);

    // Función para alternar visibilidad del modal
    function toggleModal() {
        const isVisible = contenedor.style.display === "block";
        contenedor.style.display = isVisible ? "none" : "block";
        overlay.style.display = isVisible ? "none" : "block";
    }

    // Cargar contenido del modal una sola vez
    fetch("/vistas/login/login.html")
        .then((respuesta) => respuesta.text())
        .then((texto) => {
            const auxiliar = document.createElement("div");
            auxiliar.innerHTML = texto;
            contenedor.appendChild(auxiliar);

            // Configurar el botón de cierre
            const closeBtn = contenedor.querySelector(".close");
            if (closeBtn) {
                closeBtn.addEventListener("click", toggleModal);
            }

            // Cerrar el modal al hacer clic fuera de su contenido
            overlay.addEventListener("click", toggleModal);

            // Configurar el botón de logeo
            const logeoBtn = contenedor.querySelector("#logeo");
            if (logeoBtn) {
                logeoBtn.addEventListener("click", function () {
                    const loginForm = contenedor.querySelector("#loginForm");

                    if (loginForm) {
                        loginForm.addEventListener("submit", function (event) {
                            event.preventDefault(); // Evitar el envío inmediato del formulario

                            const username = contenedor.querySelector("#username");
                            const password = contenedor.querySelector("#password");

                            if (validarLogin(username, password)) {
                                loginForm.submit();
                            } else {
                                alert("Por favor, completa todos los campos correctamente.");
                            }
                        });
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Error al cargar la plantilla del login:", error);
        });

    // Agregar evento al botón de apertura del modal
    const openModal = document.getElementById("openModal");
    if (openModal) {
        openModal.addEventListener("click", toggleModal);
    }
});
