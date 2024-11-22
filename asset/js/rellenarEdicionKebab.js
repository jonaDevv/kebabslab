let ingredientesSeleccionados = []; // Array para almacenar los ingredientes seleccionados

function editarKebab(kebab) {

    
    //Asigno los datos del kebab a las variables para rellenar la plantilla
    nombre=document.getElementById('nombre');
    nombre.innerHTML = `${kebab.nombre.toUpperCase()}`;

    if(descripcion=document.getElementById('descripcion')){
    
        descripcion.innerHTML = kebab.descripcion;
    
    }
    
    precio=document.getElementById('precio');
    precio.innerHTML = kebab.precio+"€";
    
    //Meto los ingredientes del kebab en un array
    ingredientes = kebab.ingredientes;
   
    const ingredientesKebab = document.getElementById('ingrediente');
    const aingredientes = document.getElementById("aIngrediente");
    nombreAlergenos=document.getElementById('alergenos');
    nombreAlergenos.innerHTML = "";
    
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
    
        
   
        // Recorrer el array de alérgenos dentro de cada ingrediente
        ingrediente.alergenos.forEach(alergeno => {
            // Agregar el nombre de cada alérgeno al contenedor de alérgenos
            nombreAlergenos.innerHTML += alergeno.nombre + "<br>";
        });

        ingredienteKeb.addEventListener("click", function () {
            const pareID = ingredienteKeb.parentNode.id;
            console.log(pareID)
                   
            if (pareID === "ingrediente") {
                // Mover el ingrediente del contenedor de "ingredientes" al contenedor de "kebab"
                ingredientesKebab.removeChild(ingredienteKeb);
                aingredientes.appendChild(ingredienteKeb);
            
                // Aquí eliminamos el ingrediente del array de ingredientes seleccionados si se ha quitado del "kebab"
                kebab.ingredientes = kebab.ingredientes.filter(ing => ing.id !== ingrediente.id);
                // O si quieres agregarlo al array de ingredientes seleccionados:
                // ingredientesSeleccionados.push(ingredienteKeb.ingredienteData);
            
            } else {
                // Mover el ingrediente del contenedor de "kebab" al contenedor de "ingredientes"
                ingredientesKebab.appendChild(ingredienteKeb);
                // Añadir el ingrediente al array de ingredientes seleccionados si ha sido movido al "kebab"
                kebab.ingredientes.push(ingrediente);
            }

           

   

    
       });

    });
    
     getIngredientes()
    .then(json => {

            
            // const ingredientesKebab = document.getElementById("ingrediente");
            const alerge = document.getElementById("alergenos");

            // Inicializamos el Map para rastrear alérgenos
            alerge.grupoAlergenos = new Map();

            json.forEach(item => {
                const ingredienteDiv = document.createElement('div');
                

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
                    
                        // Aseguramos que estamos agregando el objeto ingrediente al kebab
                        kebab.ingredientes.push(item); // Añadir el ingrediente al array de ingredientes del kebab
                    
                    } else {
                        // Quitar del kebab
                        // Eliminar el ingrediente del array de ingredientes del kebab
                        kebab.ingredientes = kebab.ingredientes.filter(ingrediente => ingrediente.id !== item.id);
                    
                        // Mover el div a la lista de ingredientes disponibles
                        ingredientesKebab.removeChild(ingredienteDiv);
                        aingredientes.appendChild(ingredienteDiv);
                    
                        // Remover del array de seleccionados
                        ingredientesSeleccionados = ingredientesSeleccionados.filter(ing => ing.id !== item.id);
                    }

                    // Actualizar precio total
                    precio.innerHTML = cobrarATuGusto(ingredientesSeleccionados,kebab.precio, kebab.nombre) + " €";
                    
                    // Actualizar alérgenos
                    if(ingredientesKebab.childElementCount > 0){
                        
                    
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

                    }



                    
                });
            });


           

           
        })
        .catch(error => console.log(error));

    
    return kebab;


     
}








/**
 * 
 * @param {*} ingredientes
 * @param {*} alerge
 * @param {*} action
 * @param {*} parentID
 * @returns
 */
function actualizarAlergenos(ingredientes, alerge, action, parentID) {
    // Acción puede ser "añadir" o "eliminar"
    ingredientes.forEach(item => {
        item.alergenos.forEach(alergeno => {
            const nombre = alergeno.nombre;

            if (action === "añadir" && !alerge.grupoAlergenos.has(nombre)) {
                // Si el alérgeno no está en el Map, lo añadimos
                alerge.grupoAlergenos.set(nombre, true);
            } else if (action === "eliminar" && parentID === "ingrediente") {
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

    
    let total = 0;
    if (nombre === "Tu Kebab") {

        if (ingredientes.length <= 3) {
            // Si hay 3 o menos ingredientes, incluir todos en el precio base
            total = precio;
        } else {
            // Ordenar ingredientes por precio de menor a mayor
            const sorted = [...ingredientes].sort((a, b) => a.precio - b.precio);
            // Sumar los tres más baratos al precio base
            total = precio + sorted.slice(3).reduce((sum, ing) => sum + ing.precio, 0);
        }

    }else{

        total=precio;
        
        ingredientes.forEach(ingrediente => {
            total += ingrediente.precio;  // Sumar el precio de cada ingrediente
        });



    }
    return total.toFixed(2); // Retornar con dos decimales
}
