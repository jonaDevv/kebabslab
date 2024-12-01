window.addEventListener("load", function() {
  

    listarKebabs();
    listarIngredientes();

    
    habilitarDragAndDrop();

    crearBtn=document.getElementsByClassName("crearKebab")[0]
    if(crearBtn){
        crearBtn.addEventListener("click",function(event){
            event.preventDefault();

            newKebab();
            alert("Kebab creado con éxito");
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






async function listarKebabs() {

    const kebabCont = document.getElementsByClassName('gkebab-content-kebab')[0];

    getKebabs()
    .then(json => {
        if (Array.isArray(json)) {
            json.forEach(item => {
                const kebab = document.createElement('div');
                kebab.kebab = item;
                kebab.syle
                kebab.textContent = `${item.nombre.toUpperCase()}`;
                kebab.textContent = `${item.nombre}`;
                kebab.classList.add('gkebab-kebab');
                kebabCont.appendChild(kebab);
            });
        } else {
            console.error('Hubo un error con la solicitud fetch:', error);
        }
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });





}



async function listarIngredientes() {
    const ingredientes = document.getElementsByClassName('gkebab-content-ingredientes')[0];

    try {
        const json = await getIngredientes();

        if (Array.isArray(json)) {
            json.forEach((item, index) => {
                const ingrediente = document.createElement('div');
                
                // Asigna un id único basado en el índice
                ingrediente.id = `ingrediente-${index}`;
                ingrediente.ingrediente = item; // El objeto completo se guarda aquí
                ingrediente.textContent = `${item.nombre.toUpperCase()}`;
                ingrediente.classList.add('gkebab-ingrediente');
                ingrediente.setAttribute("draggable", "true");

                ingrediente.addEventListener("dragstart", function(event) {
                    // Convertir el objeto completo a JSON y transferirlo
                    event.dataTransfer.setData("application/json", JSON.stringify(ingrediente.ingrediente));
                });

                ingrediente.addEventListener("dragend", function(event) {
                    event.target.style.backgroundColor = "";
                    event.target.style.border = "1px solid #ccc";
                });

                ingredientes.appendChild(ingrediente);
            });
        } else {
            console.error('Hubo un error con la solicitud fetch');
        }
    } catch (error) {
        console.error('Hubo un error con la solicitud fetch:', error);
    }
}

const ingredientesSeleccionados = new Map();  
function habilitarDragAndDrop() {
    const zonaDrop = document.getElementById('gkebab-ingredientes-drop');

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

        // Obtener el objeto serializado
        const jsonIngrediente = e.dataTransfer.getData('application/json');
        const ingrediente = JSON.parse(jsonIngrediente);  // Convertimos el JSON de vuelta a objeto

        // Ahora puedes trabajar con el objeto completo, por ejemplo:
        console.log(ingrediente); // Ver el objeto completo del ingrediente

        // Aquí podrías agregar el ingrediente a la zona de destino o hacer lo que necesites
        const divIngrediente = document.createElement('div');
        divIngrediente.textContent = `${ingrediente.nombre}`;
        ingredientesSeleccionados.set(ingrediente.id,ingrediente);
        divIngrediente.classList.add('gkebab-ingrediente');
        
        zonaDrop.appendChild(divIngrediente);

       divIngrediente.addEventListener("dblclick", function() { 

           ingredientesSeleccionados.delete(ingrediente.id);
            zonaDrop.removeChild(divIngrediente);
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