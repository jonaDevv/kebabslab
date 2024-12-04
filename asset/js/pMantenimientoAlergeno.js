window.addEventListener("load", function() {

 
   setInterval(listarAlerge,1000);
    listarAlerge();


    

    crearBtn=document.getElementsByClassName("crearalergeno")[0]
    if(crearBtn){
        crearBtn.addEventListener("click",function(event){
            event.preventDefault();

            newAlergeno();
            alert("Alergeno creado con éxito");
        })
    }

    updateBtn=document.getElementsByClassName("actualizaralergenoA")[0]
    if(updateBtn){
        updateBtn.addEventListener("click",function(event){
            event.preventDefault();
            updateAlergeno();
            alert("Alergenoactualizado con éxito");
            cerrarModalA();
            
        })
    }

    eliminarBtn=document.getElementsByClassName("borraralergenoA")[0]
    if(eliminarBtn){
        const idi = document.getElementById('galergeno-idA');
        eliminarBtn.addEventListener("click",function(event){
            event.preventDefault();
            eliminarAlergeno(idi.value);
            cerrarModal();
        })
    }




});















function mostrarImagenalergeno(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenPrevia = document.getElementById('galergeno-imagen-previa');
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = 'block';  // Mostrar la imagen
    };

    if (archivo) {
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de datos
    }
}

function mostrarImagenalergenoA(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenPrevia = document.getElementById('galergeno-imagen-previaA');
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = 'block';  // Mostrar la imagen
    };

    if (archivo) {
        reader.readAsDataURL(archivo);  // Leer el archivo como URL de datos
    }
}






async function listarAlerge() {

    const alergenoCont = document.getElementsByClassName('galergeno-content-alergeno')[0];
    if(alergenoCont){
        alergenoCont.innerHTML = "";
    }

    getAlergenos()
    .then(json => {
        if (Array.isArray(json)) {
            json.forEach(item => {
                const alergeno = document.createElement('div');
                alergeno.alergeno = item;
                alergeno.textContent = `${item.nombre.toUpperCase()}`;
                alergeno.classList.add('galergeno-alergeno');
                alergeno.addEventListener("click", function() {
                    abrirModalA();


                    insertarAlergeno(item);
                    console.log(item);

                });
                if(alergenoCont){
                alergenoCont.appendChild(alergeno);
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

async function insertarAlergeno(alergeno) {
    const nombre = document.getElementById('galergeno-nombreA');
    const foto = document.getElementById('galergeno-imagen-previaA');
    const precio = document.getElementById('galergeno-precioA');
    const alergenos = document.getElementById('galergeno-alergenos-dropA');
    const id = document.getElementById('galergeno-idA');

    if (id) {

        id.value = alergeno.id;
    }
    if (nombre){
        nombre.value = alergeno.nombre;
    } 

    if (ingrediente.foto) {
        foto.src = alergeno.foto;
    } else {
        foto.src = '/asset/img/brocheta.png'; // Opcional: Imagen predeterminada
    
    }
    if (precio){
        precio.value = alergeno.precio;
    } 

    
}









async function newAlergeno(){
    
    // Recoger los valores del formulario
  
    const nombre = document.getElementById('galergeno-nombre').value;
    const foto = document.getElementById('galergeno-foto').value;
    

    // Obtener los ingredientes que están en la zona de destino


    // Crear el objeto kebab
    const alergeno = [{
        nombre: nombre,
        foto: foto,
       
    }];

    console.log(JSON.stringify(alergeno))
    // Ver el objeto kebab en la consola
    // Suponiendo que tienes una función para guardar el kebab en el servidor
    try {
        const response = await createAlergeno(alergeno);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al guardar el alergeno:', error);
    }

    window.location.reload();


    // Aquí podrías enviar el objeto a un servidor o hacer cualquier otra cosa con él
}


async function updateAlergeno(){
    

    const nombre = document.getElementById('galergeno-nombreA').value;
    const foto = document.getElementById('galergeno-fotoA').value;
    const id = document.getElementById('galergeno-idA').value;

    // Obtener los ingredientes que están en la zona de destino


    // Crear el objeto kebab
    const alergeno = [{
        id: id,
        nombre: nombre,
        foto: foto,
        
    }];

    console.log(JSON.stringify(alergeno))
    // Ver el objeto kebab en la consola
    // Suponiendo que tienes una función para guardar el kebab en el servidor
    try {
        const response = await updateAlergenoId(id,alergeno);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al guardar el alergeno:', error);
    }


   
}

async function eliminarAlergeno(id) {
    try {
        const response = await deleteAlergenoId(id);
        console.log(response); // Mostrar la respuesta del servidor
    } catch (error) {
        console.error('Error al eliminar el alergeno:', error);
    }

    window.location.reload();
}




// Función para abrir el modal
function abrirModalA() {
    document.getElementById("modal-actualizar-alergeno").style.display = "block";
}

// Función para cerrar el modal
function cerrarModalA() {
    document.getElementById("modal-actualizar-alergeno").style.display = "none";
}


