window.addEventListener("load", function() {
    
    

    
        const url = 'http://www.kebabslab.com/Api/Api_ingrediente.php'; // URL de la API
    
        // Usando el método GET con fetch
        // Crear un objeto Request
        const peticion = new Request(url, {
            method: 'GET',  // Método GET
            headers: {
                'Content-Type': 'application/json',  // Si deseas enviar o recibir datos en formato JSON
            }
        });

        fetch(peticion)
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(json => {
            console.log(json);  // Añadir este log para ver la respuesta completa
            
            const aingredintes = document.getElementById('aIngrediente');
            aingredintes.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos elementos
        
            // Iterar sobre los objetos del JSON
            json.forEach(item => {
                const ingredienteDiv = document.createElement('div');
                ingredienteDiv.classList.add('asingrediente');
                ingredienteDiv.ingrediente = item;
                // Agregar nombre y precio del kebab al contenido del div
                ingredienteDiv.textContent = `${item.nombre}  ${item.precio} €`;
        
                // Añadir el div al contenedor
                aingredintes.appendChild(ingredienteDiv);
            });
        })
        .catch(error => {
            console.error('Hubo un error con la solicitud fetch:', error);
        });





});