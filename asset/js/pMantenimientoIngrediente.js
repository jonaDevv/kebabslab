window.addEventListener("load", function() {

 
   setInterval(listarIngredientesG,1000);
    listarAlergenos();


    

    crearBtn=document.getElementsByClassName("crearingrediente")[0]
    if(crearBtn){
        crearBtn.addEventListener("click",function(event){
            event.preventDefault();

            newIngrediente();
            alert("Ingrediente creado con éxito");
        })
    }

    updateBtn=document.getElementsByClassName("actualizaringredienteA")[0]
    if(updateBtn){
        updateBtn.addEventListener("click",function(event){
            event.preventDefault();
            updateIngrediente();
            alert("Ingrediente actualizado con éxito");
            cerrarModalI();
            
        })
    }

    eliminarBtn=document.getElementsByClassName("borraringredienteA")[0]
    if(eliminarBtn){
        const idi = document.getElementById('gingrediente-idA');
        eliminarBtn.addEventListener("click",function(event){
            event.preventDefault();
            eliminarIngrediente(idi.value);
            cerrarModal();
        })
    }




});















function mostrarImageningrediente(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenPrevia = document.getElementById('gingrediente-imagen-previa');
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = 'block';  // Mostrar la imagen
    };

    if (archivo) {
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de datos
    }
}

function mostrarImageningredienteA(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenPrevia = document.getElementById('gingrediente-imagen-previaA');
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = 'block';  // Mostrar la imagen
    };

    if (archivo) {
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de datos
    }
}






async function listarIngredientesG() {

    const ingredienteCont = document.getElementsByClassName('gingrediente-content-ingrediente')[0];
    if(ingredienteCont){
        ingredienteCont.innerHTML = "";
    }

    getIngredientes()
    .then(json => {
        if (Array.isArray(json)) {
            json.forEach(item => {
                const ingrediente = document.createElement('div');
                ingrediente.ingrediente = item;
                ingrediente.textContent = `${item.nombre.toUpperCase()}`;
                ingrediente.classList.add('gingrediente-ingrediente');
                ingrediente.addEventListener("click", function() {
                    abrirModalI();


                    insertarIngrediente(item);
                    console.log(item);

                });
                if(ingredienteCont){
                ingredienteCont.appendChild(ingrediente);
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

async function insertarIngrediente(ingrediente) {
    const nombre = document.getElementById('gingrediente-nombreA');
    const foto = document.getElementById('gingrediente-imagen-previaA');
    const precio = document.getElementById('gingrediente-precioA');
    const alergenos = document.getElementById('gingrediente-alergenos-dropA');
    const id = document.getElementById('gingrediente-idA');

    if (id) {

        id.value = ingrediente.id;
    }
    if (nombre){
        nombre.value = ingrediente.nombre;
    } 

    if (ingrediente.foto) {
        foto.src = ingrediente.foto;
    } else {
        foto.src = '/asset/img/brocheta.png'; // Opcional: Imagen predeterminada
    
    }
    if (precio){
        precio.value = ingrediente.precio;
    } 

    if (alergenos) {
        // Limpia los alergenos actuales en el DOM
        alergenos.innerHTML = "";

        
        alergenosSeleccionados.clear();
        ingrediente.alergenos.forEach(alergeno => {
        alergenosSeleccionados.set(alergeno.id, alergeno);

            // Crear el div para cada ingrediente
            const alergenoDiv = document.createElement('div');
            alergenoDiv.textContent = alergeno.nombre.toUpperCase();
            alergenoDiv.alergeno = alergeno;
            alergenoDiv.classList.add('gingrediente-alergeno');
            alergenoDiv.setAttribute("draggable", "true");

            // Eventos de arrastre
            alergenoDiv.addEventListener("dragstart", event => {
                event.dataTransfer.setData("application/json", JSON.stringify(alergeno));
            });
            alergenoDiv.addEventListener("dragend", event => {
                event.target.style.backgroundColor = "";
                event.target.style.border = "1px solid #ccc";
            });

            // Evento para eliminar el ingrediente
            alergenoDiv.addEventListener("dblclick", function () {
                // Eliminar del mapa y del DOM
                alergenosSeleccionados.delete(alergeno.id);
                alergenoDiv.remove();

                // Actualizar la lista de ingredientes en el objeto kebab
                ingrediente.alergenos = Array.from(alergenosSeleccionados.values());
            });

            alergenos.appendChild(alergenoDiv);
        });
    }

    habilitarDragAndDrop('gingrediente-alergenos-dropA');
}



async function listarAlergenos() {
    const alergenos = document.getElementsByClassName('gingrediente-content-alergenos')[0];
    const alergenosAK = document.getElementsByClassName('gingrediente-content-alergenosAK')[0];
    const dropContainer = document.getElementById('gingrediente-alergenos-drop');
    const dropContainerAK = document.getElementById('gingrediente-alergenos-dropA');

    try {
        const json = await getAlergenos();

        if (Array.isArray(json)) {
            json.forEach((item, index) => {
                const alergeno = document.createElement('div');

                // Asigna un id único basado en el índice
                alergeno.id = `click`;
                alergeno.alergeno = item; // El objeto completo se guarda aquí
                alergeno.textContent = `${item.nombre.toUpperCase()}`;
                alergeno.classList.add('gingrediente-alergeno');
                alergeno.setAttribute("draggable", "true");

                // Agrega los eventos de arrastrar
                alergeno.addEventListener("dragstart", function(event) {
                    console.log("Datos del alergeno:", alergeno.alergeno);
                    if (alergeno.alergeno) {
                        event.dataTransfer.setData("application/json", JSON.stringify(alergeno.alergeno));
                    } else {
                        console.error("El alergeno no tiene datos válidos para transferir.");
                    }
                });

                alergeno.addEventListener("dragend", function(event) {
                    event.target.style.backgroundColor = "";
                    event.target.style.border = "1px solid #ccc";
                });

                // Agrega el evento de doble clic
                alergeno.addEventListener("click", function() {
                    // Verificar si el alergeno ya está en el contenedor de destino
                    if (alergenosSeleccionados.has(item.id)) {
                        console.warn(`El alergeno "${item.nombre}" ya está agregado.`);
                        return;
                    }
                
                    // Agregar al mapa `ingredientesSeleccionados`
                    alergenosSeleccionados.set(item.id, item);
                
                    // Crear un nuevo elemento para el contenedor de destino
                    const divalergeno = document.createElement('div');
                    divalergeno.textContent = item.nombre.toUpperCase();
                    divalergeno.classList.add('gingrediente-alergeno');
                
                    // Agregar evento para eliminar con doble clic
                    divalergeno.addEventListener("dblclick", function() {
                        alergenosSeleccionados.delete(item.id); // Eliminar del mapa
                        divalergeno.remove(); // Eliminar del DOM
                    });
                
                    // Mover el ingrediente al contenedor de destino
                    dropContainer.appendChild(divalergeno);
                });

                // Agrega el ingrediente al primer contenedor
                if(alergenos){
                alergenos.appendChild(alergeno);
                }

                // Si hay un segundo contenedor, clonar y asignar eventos
                if (alergenosAK) {
                    const alergenoClone = alergeno.cloneNode(true);

                    // Reasigna los eventos al clon
                    alergenoClone.addEventListener("dragstart", function(event) {
                        console.log("Datos del clon de alergeno:", alergeno.alergeno);
                        if (alergeno.alergeno) {
                            event.dataTransfer.setData("application/json", JSON.stringify(alergeno.alergeno));
                        } else {
                            console.error("El clon del alergeno no tiene datos válidos para transferir.");
                        }
                    });

                    alergenoClone.addEventListener("dragend", function(event) {
                        event.target.style.backgroundColor = "";
                        event.target.style.border = "1px solid #ccc";
                    });

                    // Agrega el evento de doble clic al clon
                    alergenoClone.addEventListener("click", function() {
                        // Verificar si el ingrediente ya está en el contenedor de destino
                        if (alergenosSeleccionados.has(item.id)) {
                            console.warn(`El alergeno "${item.nombre}" ya está agregado.`);
                           
                            return;
                        }
                    
                        // Agregar al mapa `ingredientesSeleccionados`
                        alergenosSeleccionados.set(item.id, item);
                    
                        // Crear un nuevo elemento para el contenedor de destino
                        const divalergeno = alergenoClone.cloneNode(true);
                        divalergeno.classList.add('gingrediente-alergeno');
                    
                        // Agregar evento para eliminar con doble clic
                        divalergeno.addEventListener("dblclick", function() {
                            alergenosSeleccionados.delete(item.id); // Eliminar del mapa
                            divalergeno.remove(); // Eliminar del DOM
                        });
                    
                        // Mover el clon al contenedor de destino
                        dropContainerAK.appendChild(divalergeno);
                    });
                    

                    alergenosAK.appendChild(alergenoClone);
                }
            });
        } else {
            console.error('Hubo un error con la solicitud fetch');
        }
    } catch (error) {
        console.error('Hubo un error con la solicitud fetch:', error);
    }

    habilitarDragAndDrop('gingrediente-alergenos-drop');
}



const alergenosSeleccionados = new Map();
function habilitarDragAndDrop(zonaId) {
    const zonaDrop = document.getElementById(zonaId);
    if(zonaDrop){
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
        const jsonAlergeno = e.dataTransfer.getData('application/json');
        const alergeno = JSON.parse(jsonAlergeno); // Parseamos el JSON
    
        // Verificar si el ingrediente ya existe para evitar duplicados
        if (alergenosSeleccionados.has(alergeno.id)) {
            console.warn(`El alergeno "${alergeno.nombre}" ya está agregado.`);
            return;
        }
    
        // Crear y configurar el elemento para el ingrediente
        const divalergeno= document.createElement('div');
        divalergeno.textContent = alergeno.nombre;
        divalergeno.classList.add('gingrediente-alergeno');
    
        // Agregar el ingrediente al mapa y al DOM
        alergenosSeleccionados.set(alergeno.id, alergeno);
        zonaDrop.appendChild(divalergeno);
    
        // Agregar evento para eliminar el ingrediente con doble clic
        divalergeno.addEventListener('dblclick', () => {
            alergenosSeleccionados.delete(alergeno.id); // Eliminar del mapa
            zonaDrop.removeChild(divalergeno); // Eliminar del DOM
        });
    });
    
}
}


async function newIngrediente(){
    // Obtener el contenedor de los ingredientes seleccionados
     const alergenosIngrediente = Array.from(alergenosSeleccionados.values());
    // Recoger los valores del formulario
    const precio = document.getElementById('gingrediente-precio').value;
    const nombre = document.getElementById('gingrediente-nombre').value;
    const foto = document.getElementById('gingrediente-foto').value;
    

    // Obtener los ingredientes que están en la zona de destino


    // Crear el objeto kebab
    const ingrediente = [{
        nombre: nombre,
        precio: precio,
        foto: foto,
        alergenos:alergenosIngrediente
    }];

    console.log(JSON.stringify(ingrediente))
    // Ver el objeto kebab en la consola
    // Suponiendo que tienes una función para guardar el kebab en el servidor
    try {
        const response = await crearIngrediente(ingrediente);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al guardar el ingrediente:', error);
    }


    // Aquí podrías enviar el objeto a un servidor o hacer cualquier otra cosa con él
}


async function updateIngrediente(){
    // Obtener el contenedor de los ingredientes seleccionados
     const alergenosIngrediente = Array.from(alergenosSeleccionados.values());
    // Recoger los valores del formulario
    const precio = document.getElementById('gingrediente-precioA').value;
    const nombre = document.getElementById('gingrediente-nombreA').value;
    const foto = document.getElementById('gingrediente-fotoA').value;
    const id = document.getElementById('gingrediente-idA').value;

    // Obtener los ingredientes que están en la zona de destino


    // Crear el objeto kebab
    const ingrediente = [{
        id: id,
        nombre: nombre,
        precio: precio,
        foto: foto,
        alergenos:alergenosIngrediente
    }];

    console.log(JSON.stringify(ingrediente))
    // Ver el objeto kebab en la consola
    // Suponiendo que tienes una función para guardar el kebab en el servidor
    try {
        const response = await updateIngredienteId(id,ingrediente);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al guardar el ingrediente:', error);
    }


   
}

async function eliminarIngrediente(id) {
    try {
        const response = await deleteIngredienteId(id);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al eliminar el ingrediente:', error);
    }
}




// Función para abrir el modal
function abrirModalI() {
    document.getElementById("modal-actualizar-ingrediente").style.display = "block";
}

// Función para cerrar el modal
function cerrarModalI() {
    document.getElementById("modal-actualizar-ingrediente").style.display = "none";
}


