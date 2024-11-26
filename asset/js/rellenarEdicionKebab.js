

function editarKebab(k) {
    let ingredientesSeleccionados = []; // Array para almacenar los ingredientes seleccionados
    const kebab = structuredClone(k);

   
    if (kebab){
        // Asigno los datos del kebab a las variables para rellenar la plantilla
        nombre = document.getElementById('nombre');
        precio = document.getElementById('precio');
        if(nombre && precio){
            nombre.innerHTML = `${kebab.nombre.toUpperCase()}`;
        
        

            if (descripcion = document.getElementById('descripcion')) {
                descripcion.innerHTML = kebab.descripcion;
            }


        
            precio.innerHTML = k.precio + "€";
        }
        // Meto los ingredientes del kebab en un array
        ingredientes = kebab.ingredientes;

        const ingredientesKebab = document.getElementById('ingrediente');
        const aingredientes = document.getElementById("aIngrediente");
        const alerge = document.getElementById('alergenos');

        if(ingredientesKebab && aingredientes && alerge){
            alerge.innerHTML = "";

            // Inicializamos el Map para rastrear alérgenos
            alerge.grupoAlergenos = new Map();

            ingredientes.forEach(ingrediente => {
                // Crear un div para el ingrediente
                const ingredienteKeb = document.createElement('div');

                // Asignar la clase 'ingredientePropio' al div
                ingredienteKeb.classList.add('ingredientePropio');

                // Asignar el objeto completo como propiedad en el div para futuras referencias
                ingredienteKeb.ingredienteData = ingrediente;

                // Agregar el nombre del ingrediente al contenido del div
                ingredienteKeb.textContent = `${ingrediente.nombre}`;
                

                // Mostrar el ingrediente en el contenedor 'ingredientesKebab'
                ingredientesKebab.appendChild(ingredienteKeb);

                // Actualizar los alérgenos
                actualizarAlergenos([ingrediente], alerge, "añadir");

                ingredienteKeb.addEventListener("click", function () {
                    const pareID = ingredienteKeb.parentNode.id;

                    if (pareID === "ingrediente") {
                        // Mover el ingrediente del contenedor de "ingredientes" al contenedor de "kebab"
                        ingredientesKebab.removeChild(ingredienteKeb);
                        aingredientes.appendChild(ingredienteKeb);

                        // Eliminar el ingrediente del array de ingredientes del kebab
                        kebab.ingredientes = kebab.ingredientes.filter(ing => ing.id !== ingrediente.id);

                        // Actualizar los alérgenos
                        actualizarAlergenos([ingrediente], alerge, "eliminar");
                    } else {
                        // Mover el ingrediente del contenedor de "kebab" al contenedor de "ingredientes"
                        ingredientesKebab.appendChild(ingredienteKeb);

                        // Añadir el ingrediente al array de ingredientes del kebab
                        kebab.ingredientes.push(ingrediente);

                        // Actualizar los alérgenos
                        actualizarAlergenos([ingrediente], alerge, "añadir");
                    }
                });
            });
        }

        getIngredientes()
            .then(json => {
                json.forEach(item => {

                        const ingredienteDiv = document.createElement('div');

                        if(ingredienteDiv){

                            ingredienteDiv.classList.add('listaIngrediente');
                            ingredienteDiv.ingrediente = item;
                            ingredienteDiv.textContent = `${item.nombre} ${item.precio} €`;
                            
                            if(aingredientes){
                                aingredientes.appendChild(ingredienteDiv);
                            }
                            
                            
                            ingredienteDiv.addEventListener("click", function () {
                                const parentID = ingredienteDiv.parentNode.id;

                                if (parentID === "aIngrediente") {
                                    // Mover a kebab
                                    aingredientes.removeChild(ingredienteDiv);

                                    ingredientesKebab.appendChild(ingredienteDiv);

                                    kebab.ingredientes.push(ingredienteDiv.ingrediente);

                                    ingredientesSeleccionados.push(ingredienteDiv.ingrediente);

                                    // Actualizar alérgenos
                                    actualizarAlergenos([ingredienteDiv.ingrediente], alerge, "añadir");
                                } else {
                                    // Quitar del kebab
                                    ingredientesKebab.removeChild(ingredienteDiv);
                                    aingredientes.appendChild(ingredienteDiv);
                                    kebab.ingredientes = kebab.ingredientes.filter(ingrediente => ingrediente.id !== item.id);
                                    ingredientesSeleccionados = ingredientesSeleccionados.filter(ing => ing.id !== item.id);
                                    // Actualizar alérgenos
                                    actualizarAlergenos([ingredienteDiv.ingrediente], alerge, "eliminar");
                                }

                                // Actualizar precio total
                                precio.innerHTML = cobrarATuGusto(ingredientesSeleccionados, k.precio, kebab.nombre) + " €";
                                kebab.precio = parseFloat(precio.innerHTML.replace(/[^\d.-]/g, ''));
                            });
                         }
                });
                
            })
            .catch(error => console.log(error));



    }   
    return kebab;
}









function actualizarAlergenos(ingredientes, alerge, action) {
    // Acción puede ser "añadir" o "eliminar"
    ingredientes.forEach(item => {
        item.alergenos.forEach(alergeno => {
            const nombre = alergeno.nombre;

            if (action === "añadir" && !alerge.grupoAlergenos.has(nombre)) {
                // Si el alérgeno no está en el Map, lo añadimos
                alerge.grupoAlergenos.set(nombre, true);
            } else if (action === "eliminar") {
                // Si el ingrediente se eliminó del kebab, quitamos el alérgeno
                alerge.grupoAlergenos.delete(nombre);
            }
        });
    });

    // Renderizamos los alérgenos actualizados
    alerge.innerHTML = Array.from(alerge.grupoAlergenos.keys())
        .map(alergeno => `${alergeno}<br>`)
        .join("");
}


/**
 * 
 * @param {*} ingredientes 
 * @param {*} precio 
 * @param {*} nombre 
 * @returns 
 */
function cobrarATuGusto(ingredientes,precio,nombre) {
    if (!Array.isArray(ingredientes)) {
        console.error("El parámetro 'ingredientes' no es un array válido.");
        return 0; // Retorna 0 si el parámetro no es un array
    }

    
    let total = precio;

    if (nombre === "Tu Kebab") {

        if (ingredientes.length <= 3) {
            // Si hay 3 o menos ingredientes, incluir todos en el precio base
            //total = precio;
        } else {
            // Ordenar ingredientes por precio de menor a mayor
            const sorted = [...ingredientes].sort((a, b) => a.precio - b.precio);
            // Sumar los tres más baratos al precio base
            total = precio + sorted.slice(3).reduce((sum, ing) => sum + ing.precio, 0);
        }

    }else{

        //total=precio;
        
        ingredientes.forEach(ingrediente => {
            total += ingrediente.precio;  // Sumar el precio de cada ingrediente
        });



    }
    return total.toFixed(2); // Retornar con dos decimales
}
