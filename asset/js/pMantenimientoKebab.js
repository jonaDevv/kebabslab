window.addEventListener("load", function() {

    listarKebabs();
   setInterval(listarKebabs,5000);
    listarIngredientes();


    

    crearBtn=document.getElementsByClassName("crearKebab")[0]
    if(crearBtn){
        crearBtn.addEventListener("click",function(event){
            event.preventDefault();

            newKebab();
            alert("Kebab creado con éxito");
        })
    }

    updateBtn=document.getElementsByClassName("actualizarKebabA")[0]
    if(updateBtn){
        updateBtn.addEventListener("click",function(event){
            event.preventDefault();
            updateKebab();
            alert("Kebab actualizado con éxito");
            cerrarModal();
            
        })
    }

    eliminarBtn=document.getElementsByClassName("borrarKebabA")[0]
    if(eliminarBtn){
        const idk = document.getElementById('gkebab-idA');
        eliminarBtn.addEventListener("click",function(event){
            event.preventDefault();
            eliminarKebab(idk.value);
            cerrarModal();
        })
    }




});















function mostrarImagen(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenPrevia = document.getElementById('gkebab-imagen-previa');
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = 'block';  // Mostrar la imagen
    };

    if (archivo) {
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de datos
    }
}

function mostrarImagenA(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenPrevia = document.getElementById('gkebab-imagen-previaA');
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = 'block';  // Mostrar la imagen
    };

    if (archivo) {
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de datos
    }
}






async function listarKebabs() {

    const kebabCont = document.getElementsByClassName('gkebab-content-kebab')[0];
    if(kebabCont){
    kebabCont.innerHTML = "";
    }
    getKebabs()
    .then(json => {
        if (Array.isArray(json)) {
            json.forEach(item => {
                const kebab = document.createElement('div');
                kebab.kebab = item;
                kebab.textContent = `${item.nombre.toUpperCase()}`;
                kebab.classList.add('gkebab-kebab');
                kebab.addEventListener("click", function() {
                    abrirModal();


                    insertarKebab(item);
                    console.log(item);

                });
            if(kebabCont){
                kebabCont.appendChild(kebab);
            }
            });
        } else {
            console.error('Hubo un error con la solicitud fetch:', error);
        }
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });





}

async function insertarKebab(kebab) {
    const nombre = document.getElementById('gkebab-nombreA');
    const foto = document.getElementById('gkebab-imagen-previaA');
    const precio = document.getElementById('gkebab-precioA');
    const ingredientes = document.getElementById('gkebab-ingredientes-dropA');
    const id = document.getElementById('gkebab-idA');

    if (id) {

        id.value = kebab.id;
    }
    if (nombre){
        nombre.value = kebab.nombre;
    } 

    if (kebab.foto) {
        foto.src = kebab.foto;
    } else {
        foto.src = '/asset/img/favicon1.png'; // Opcional: Imagen predeterminada
    
    }
    if (precio){
        precio.value = kebab.precio;
    } 

    if (ingredientes) {
        // Limpia los ingredientes actuales en el DOM
        ingredientes.innerHTML = "";

        // Reinicia el mapa `ingredientesSeleccionados` con los ingredientes del kebab
        ingredientesSeleccionados.clear();
        kebab.ingredientes.forEach(ingrediente => {
            ingredientesSeleccionados.set(ingrediente.id, ingrediente);

            // Crear el div para cada ingrediente
            const ingredienteDiv = document.createElement('div');
            ingredienteDiv.textContent = ingrediente.nombre.toUpperCase();
            ingredienteDiv.ingrediente = ingrediente;
            ingredienteDiv.classList.add('gkebab-ingrediente');
            ingredienteDiv.setAttribute("draggable", "true");

            // Eventos de arrastre
            ingredienteDiv.addEventListener("dragstart", event => {
                event.dataTransfer.setData("application/json", JSON.stringify(ingrediente));
            });
            ingredienteDiv.addEventListener("dragend", event => {
                event.target.style.backgroundColor = "";
                event.target.style.border = "1px solid #ccc";
            });

            // Evento para eliminar el ingrediente
            ingredienteDiv.addEventListener("dblclick", function () {
                // Eliminar del mapa y del DOM
                ingredientesSeleccionados.delete(ingrediente.id);
                ingredienteDiv.remove();

                // Actualizar la lista de ingredientes en el objeto kebab
                kebab.ingredientes = Array.from(ingredientesSeleccionados.values());
            });

            ingredientes.appendChild(ingredienteDiv);
        });
    }

    habilitarDragAndDrop('gkebab-ingredientes-dropA');
}



async function listarIngredientes() {
    const ingredientes = document.getElementsByClassName('gkebab-content-ingredientes')[0];
    const ingredientesAK = document.getElementsByClassName('gkebab-content-ingredientesAK')[0];
    const dropContainer = document.getElementById('gkebab-ingredientes-drop');
    const dropContainerAK = document.getElementById('gkebab-ingredientes-dropA');

    try {
        const json = await getIngredientes();

        if (Array.isArray(json)) {
            json.forEach((item, index) => {
                const ingrediente = document.createElement('div');

                // Asigna un id único basado en el índice
                ingrediente.id = `click`;
                ingrediente.ingrediente = item; // El objeto completo se guarda aquí
                ingrediente.textContent = `${item.nombre.toUpperCase()}`;
                ingrediente.classList.add('gkebab-ingrediente');
                ingrediente.setAttribute("draggable", "true");

                // Agrega los eventos de arrastrar
                ingrediente.addEventListener("dragstart", function(event) {
                    console.log("Datos del ingrediente:", ingrediente.ingrediente);
                    if (ingrediente.ingrediente) {
                        event.dataTransfer.setData("application/json", JSON.stringify(ingrediente.ingrediente));
                    } else {
                        console.error("El ingrediente no tiene datos válidos para transferir.");
                    }
                });

                ingrediente.addEventListener("dragend", function(event) {
                    event.target.style.backgroundColor = "";
                    event.target.style.border = "1px solid #ccc";
                });

                // Agrega el evento de doble clic
                ingrediente.addEventListener("click", function() {
                    // Verificar si el ingrediente ya está en el contenedor de destino
                    if (ingredientesSeleccionados.has(item.id)) {
                        console.warn(`El ingrediente "${item.nombre}" ya está agregado.`);
                        return;
                    }
                
                    // Agregar al mapa `ingredientesSeleccionados`
                    ingredientesSeleccionados.set(item.id, item);
                
                    // Crear un nuevo elemento para el contenedor de destino
                    const divIngrediente = document.createElement('div');
                    divIngrediente.textContent = item.nombre.toUpperCase();
                    divIngrediente.classList.add('gkebab-ingrediente');
                
                    // Agregar evento para eliminar con doble clic
                    divIngrediente.addEventListener("dblclick", function() {
                        ingredientesSeleccionados.delete(item.id); // Eliminar del mapa
                        divIngrediente.remove(); // Eliminar del DOM
                    });
                
                    // Mover el ingrediente al contenedor de destino
                    dropContainer.appendChild(divIngrediente);
                });

                // Agrega el ingrediente al primer contenedor
                if (ingredientes) {
                    ingredientes.appendChild(ingrediente);
                }
                

                // Si hay un segundo contenedor, clonar y asignar eventos
                if (ingredientesAK) {
                    const ingredienteClone = ingrediente.cloneNode(true);

                    // Reasigna los eventos al clon
                    ingredienteClone.addEventListener("dragstart", function(event) {
                        console.log("Datos del clon de ingrediente:", ingrediente.ingrediente);
                        if (ingrediente.ingrediente) {
                            event.dataTransfer.setData("application/json", JSON.stringify(ingrediente.ingrediente));
                        } else {
                            console.error("El clon del ingrediente no tiene datos válidos para transferir.");
                        }
                    });

                    ingredienteClone.addEventListener("dragend", function(event) {
                        event.target.style.backgroundColor = "";
                        event.target.style.border = "1px solid #ccc";
                    });

                    // Agrega el evento de doble clic al clon
                    ingredienteClone.addEventListener("click", function() {
                        // Verificar si el ingrediente ya está en el contenedor de destino
                        if (ingredientesSeleccionados.has(item.id)) {
                            console.warn(`El ingrediente "${item.nombre}" ya está agregado.`);
                            return;
                        }
                    
                        // Agregar al mapa `ingredientesSeleccionados`
                        ingredientesSeleccionados.set(item.id, item);
                    
                        // Crear un nuevo elemento para el contenedor de destino
                        const divIngrediente = ingredienteClone.cloneNode(true);
                        divIngrediente.classList.add('gkebab-ingrediente');
                    
                        // Agregar evento para eliminar con doble clic
                        divIngrediente.addEventListener("dblclick", function() {
                            ingredientesSeleccionados.delete(item.id); // Eliminar del mapa
                            divIngrediente.remove(); // Eliminar del DOM
                        });
                    
                        // Mover el clon al contenedor de destino
                        dropContainerAK.appendChild(divIngrediente);
                    });
                    

                    ingredientesAK.appendChild(ingredienteClone);
                }
            });
        } else {
            console.error('Hubo un error con la solicitud fetch');
        }
    } catch (error) {
        console.error('Hubo un error con la solicitud fetch:', error);
    }

    habilitarDragAndDrop('gkebab-ingredientes-drop');
}



const ingredientesSeleccionados = new Map();
function habilitarDragAndDrop(zonaId) {
    const zonaDrop = document.getElementById(zonaId);

    // Evitar el comportamiento predeterminado para permitir que el elemento se pueda soltar
    zonaDrop.addEventListener('dragover', (e) => {
        e.preventDefault();
        zonaDrop.classList.add('hovered');
    });

    // Eliminar la clase 'hovered' cuando el elemento deja de estar sobre la zona de soltar
    zonaDrop.addEventListener('dragleave', () => {
        zonaDrop.classList.remove('hovered');
    });

    // Manejar el evento cuando un ingrediente se suelta en la zona de soltar
    zonaDrop.addEventListener('drop', (e) => {
        e.preventDefault();
        zonaDrop.classList.remove('hovered');
    
        // Obtener y procesar el objeto serializado
        const jsonIngrediente = e.dataTransfer.getData('application/json');
        const ingrediente = JSON.parse(jsonIngrediente); // Parseamos el JSON
    
        // Verificar si el ingrediente ya existe para evitar duplicados
        if (ingredientesSeleccionados.has(ingrediente.id)) {
            console.warn(`El ingrediente "${ingrediente.nombre}" ya está agregado.`);
            return;
        }
    
        // Crear y configurar el elemento para el ingrediente
        const divIngrediente = document.createElement('div');
        divIngrediente.textContent = ingrediente.nombre;
        divIngrediente.classList.add('gkebab-ingrediente');
    
        // Agregar el ingrediente al mapa y al DOM
        ingredientesSeleccionados.set(ingrediente.id, ingrediente);
        zonaDrop.appendChild(divIngrediente);
    
        // Agregar evento para eliminar el ingrediente con doble clic
        divIngrediente.addEventListener('dblclick', () => {
            ingredientesSeleccionados.delete(ingrediente.id); // Eliminar del mapa
            zonaDrop.removeChild(divIngrediente); // Eliminar del DOM
        });
    });
    
   
}


async function newKebab(){
    // Obtener el contenedor de los ingredientes seleccionados
     const ingredientesKebab = Array.from(ingredientesSeleccionados.values());
    // Recoger los valores del formulario
    const precio = document.getElementById('gkebab-precio').value;
    const nombre = document.getElementById('gkebab-nombre').value;
    const foto = document.getElementById('gkebab-foto').value;

    // Obtener los ingredientes que están en la zona de destino


    // Crear el objeto kebab
    const kebab = [{
        nombre: nombre,
        precio: precio,
        foto: foto,
        ingredientes:ingredientesKebab
    }];

    console.log(JSON.stringify(kebab))
    // Ver el objeto kebab en la consola
    // Suponiendo que tienes una función para guardar el kebab en el servidor
    try {
        const response = await crearKebab(kebab);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al guardar el kebab:', error);
    }


    // Aquí podrías enviar el objeto a un servidor o hacer cualquier otra cosa con él
}


async function updateKebab(){
    // Obtener el contenedor de los ingredientes seleccionados
     const ingredientesKebab = Array.from(ingredientesSeleccionados.values());
    // Recoger los valores del formulario
    const precio = document.getElementById('gkebab-precioA').value;
    const nombre = document.getElementById('gkebab-nombreA').value;
    const foto = document.getElementById('gkebab-fotoA').value;
    const id = document.getElementById('gkebab-idA').value;

    // Obtener los ingredientes que están en la zona de destino


    // Crear el objeto kebab
    const kebab = [{
        id: id,
        nombre: nombre,
        precio: precio,
        foto: foto,
        ingredientes:ingredientesKebab
    }];

    console.log(JSON.stringify(kebab))
    // Ver el objeto kebab en la consola
    // Suponiendo que tienes una función para guardar el kebab en el servidor
    try {
        const response = await updateKebabId(id,kebab);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al guardar el kebab:', error);
    }


   
}

async function eliminarKebab(id) {
    try {
        const response = await deleteKebabId(id);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al eliminar el kebab:', error);
    }
}




// Función para abrir el modal
function abrirModal() {
    document.getElementById("modal-actualizar-kebab").style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modal-actualizar-kebab").style.display = "none";
}


