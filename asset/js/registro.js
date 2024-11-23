window.addEventListener('load', function() {

        
        var registroForm = document.getElementById("registroForm");
    if(registroForm){
        registroForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar el envío inmediato del formulario

            // Crear un objeto FormData con los datos del formulario
            const data = Object.fromEntries(new FormData(event.target));
            console.log(data);
            // Si quieres validar los datos antes de enviarlos
            
            if (validarRegistro(data.nombre, data.password, data.correo)) {
                // Convertir los datos a JSON
                const jsonData = JSON.stringify([data]);
                console.log(jsonData);
                // Enviar los datos al servidor utilizando fetch
                fetch("/Api/Api_usuario.php", {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: 
                        jsonData
                    
                })
                .then(response => response.json()) // Respuesta del servidor en formato JSON
                .then(data => {
                    console.log(data);
                    if (data.success) {

                        alert("Registro exitoso.");
                        
                        window.location.href = '/?menu=inicio';

                    } else {
                        alert("Error: " + data.error);
                    }
                    console.log(data.success);
                })
                .catch(error => {
                    console.error("Error al enviar los datos:", error);
                    alert("Hubo un error al enviar el formulario.");
                });

            } else {
                alert("Por favor, completa todos los campos correctamente.");
            }
        });

    }            

            













});




