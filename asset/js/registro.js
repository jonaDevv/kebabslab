window.addEventListener('load', function() {

    var registroForm = document.getElementById("registroFom");

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




