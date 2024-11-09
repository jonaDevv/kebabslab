window.addEventListener("load", function() {
    
    

    document.getElementById("kebab").addEventListener("click", function() {
        const url = 'http://www.kebabslab.com/Api/Api_ingrediente.php'; // URL de la API
    
        // Usando el método GET con fetch
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json(); // Convertimos la respuesta en formato JSON
            })
            .then(data => {
                // Seleccionamos el div de resultados
                const resultadoDiv = document.getElementById("resultado");
                resultadoDiv.innerHTML = ""; // Limpiar el contenido anterior, si existe
    
                // Iterar sobre los datos y crear un div por cada elemento
                data.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.textContent = JSON.stringify(item); // Puedes personalizar la salida
                    resultadoDiv.appendChild(itemDiv); // Añadir el div al contenedor
                });
            })
            .catch(error => {
                console.error('Hubo un error con la solicitud fetch:', error);
            });
    });





});

function verKebab() {
    
    // URL de la API o del servidor al que se quiere hacer la solicitud GET
    

    




}