let ingredientesSeleccionados = []; // Array para almacenar los ingredientes seleccionados

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

                    if (parentID === "aIngrediente") {
                        // Mover a kebab
                        ingredientesKebab.appendChild(ingredienteDiv);
                        ingredientesSeleccionados.push(item); // Agregar al array de seleccionados
                    } else {
                        // Quitar del kebab
                        ingredientesKebab.removeChild(ingredienteDiv);
                        aingredientes.appendChild(ingredienteDiv);
                        // Remover del array de seleccionados
                        ingredientesSeleccionados = ingredientesSeleccionados.filter(ing => ing.id !== item.id);
                    }

                    // Actualizar precio total
                    precioKebab.innerHTML = cobrarATuGusto(ingredientesSeleccionados) + " €";

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

// Función para calcular el precio total
function cobrarATuGusto(ingredientes) {
    if (!Array.isArray(ingredientes)) {
        console.error("El parámetro 'ingredientes' no es un array válido.");
        return 0; // Retorna 0 si el parámetro no es un array
    }

    let total = 0;

    if (ingredientes.length <= 3) {
        // Si hay 3 o menos ingredientes, incluir todos en el precio base
        total = 3.50;
    } else {
        // Ordenar ingredientes por precio de menor a mayor
        const sorted = [...ingredientes].sort((a, b) => a.precio - b.precio);
        // Sumar los tres más baratos al precio base
        total = 3.50 + sorted.slice(3).reduce((sum, ing) => sum + ing.precio, 0);
    }

    return total.toFixed(2); // Retornar con dos decimales
}
