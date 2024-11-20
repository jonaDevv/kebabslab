function listaIngredientes() {
    fetch("/Api/Api_ingrediente.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(json => {
            const aingredientes = document.getElementById("aIngrediente");
            const ingredientesKebab = document.getElementById("ingrediente");
            const precioKebab = document.getElementById("precio");
            const alerge = document.getElementById("alergenos");

            // Inicializamos el Map para rastrear alérgenos
            alerge.grupoAlergenos = new Map();
            
            json.forEach(item => {
                const ingredienteDiv = document.createElement('div');
                ingredienteDiv.style = `
                    margin: 0px;
                    border-radius: 10px;
                    border: 1px solid black;
                    box-sizing: border-box;
                    background-color: #f39c12;
                    color: white;
                    font-weight: bold;
                    width: 100%;
                    height: 10%;
                    text-align: center;
                    margin-bottom: 5px;
                `;
                ingredienteDiv.classList.add('listaIngrediente');
                ingredienteDiv.ingrediente = item;
                ingredienteDiv.textContent = `${item.nombre} ${item.precio} €`;
                aingredientes.appendChild(ingredienteDiv);

                ingredienteDiv.addEventListener("click", function () {
                    const parentID = ingredienteDiv.parentNode.id;

                    // Mover ingrediente entre contenedores
                    if (parentID === "aIngrediente") {
                        ingredientesKebab.appendChild(ingredienteDiv);

                        precioKebab.innerHTML = (parseFloat(precioKebab.innerHTML) || 0) + item.precio + " €";
                    } else {
                        ingredientesKebab.removeChild(ingredienteDiv);
                        aingredientes.appendChild(ingredienteDiv);
                        precioKebab.innerHTML = (parseFloat(precioKebab.innerHTML) || 0) - item.precio + " €";
                    }

                    // Actualizar alérgenos
                    item.alergenos.forEach(alergeno => {
                        const nombre = alergeno.nombre;

                        if (!alerge.grupoAlergenos.has(nombre)) {
                            // Si no está en el Map, lo añadimos
                            alerge.grupoAlergenos.set(nombre, true);
                        } else if (parentID === "ingrediente") {
                            // Si el ingrediente se eliminó del kebab, quitamos el alérgeno
                            alerge.grupoAlergenos.delete(nombre);
                        }

                        // Renderizamos los alérgenos actualizados
                        alerge.innerHTML = Array.from(alerge.grupoAlergenos.keys())
                            .map(alergeno => `${alergeno}<br>`)
                            .join("");
                    });
                });
            });
        })
        .catch(error => console.log(error));
}






// function cobrarATuGusto(ingredientes) {
//     if (!Array.isArray(ingredientes)) {
//         console.error("El parámetro 'ingredientes' no es un array válido.");
//         return 0; // Retorna 0 si el parámetro no es un array
//     }

//     let total = 0;

//     ingredientes.sort((a, b) => b.precio - a.precio); // Invertir 

//     for (let i = 0; i < ingredientes.length; i++) {
//         total += ingredientes[i].precio;
//     }

//     return total;
// }


// Función para actualizar el precio total
function cobrarATuGusto() {
    let total = 3.50; // Precio base que incluye los tres ingredientes más baratos

    if (selectedIngredients.length > 3) {
        // Ordenar los precios de los ingredientes seleccionados de menor a mayor
        const sortedPrices = selectedIngredients
            .map(id => ingredientPrices[id])
            .sort((a, b) => a - b);

        // Calcular el costo de los ingredientes adicionales
        const extraIngredients = sortedPrices.slice(3); // Ingredientes a partir del cuarto
        total += extraIngredients.reduce((sum, price) => sum + price, 0);
    }

    // Mostrar el precio total actualizado
    document.getElementById("total-price").innerText = total.toFixed(2);

    // Habilitar o deshabilitar el botón según el número de ingredientes
    document.getElementById("create-kebab-btn").disabled = selectedIngredients.length < 1;
}







async function obtenerKebab(kebab) {
    try {
        // Realizar el fetch y esperar la respuesta
        const respuesta = await fetch('Api/Api_kebab.php?nombre=' + kebab.nombre,);
        
        // Verificar si la respuesta es exitosa (HTTP status 200-299)
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status} - ${respuesta.statusText}`);
        }

        // Convertir la respuesta a JSON
        const datos = await respuesta.json();

        // Mostrar los datos obtenidos
        console.log("Datos del kebab:", datos);
        return datos; // Devolver los datos si los necesitas




    } catch (error) {
        // Manejo de errores
        console.error("Error al obtener el kebab:", error);
    }


}


