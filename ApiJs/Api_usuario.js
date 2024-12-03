async function checkSession() {

    const response = await fetch('/Api/Api_sesion.php');
    
      const sesion = await response.json();
    
    
      return sesion.user;
}

async function getUsuario(id){
    
    const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
         // Solo envías el saldo en el cuerpo
    });

    const usuario = await response.json()
    return usuario;
}

async function updateUser(id,perfil){
    
    const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(perfil)
    }); 
    
    const perfilActualizado = await response.json();
    return perfilActualizado;
}

async function getUsuarios() {
    const response = await fetch('/Api/Api_usuario.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();  // Obtener el JSON completo

    // Si 'data' ya es un arreglo de usuarios, solo lo retornamos
    if (Array.isArray(data)) {
        return data;  // Regresamos el arreglo de usuarios directamente
    } else {
        throw new Error('La respuesta no contiene un arreglo de usuarios.');
    }
}



getUserLocaleStorage=async function(){
    const user = JSON.parse(localStorage.getItem('User'));
    return user;
}




async function mostrarPerfil(id) {
    
    const user = JSON.parse(localStorage.getItem('User'));

    perfil= await getUsuario(id);
    
    
    // Suponiendo que el objeto perfil tiene campos como nombre, correo y foto
    const nombre = document.getElementById('nombrePerfil');
    const correo = document.getElementById('correoPerfil');
    const fotoPerfil = document.getElementById('fotoPerfilImg');
    const password = document.getElementById('passPerfil');
    const monedero = document.getElementsByClassName('saldoPerfil')[0];
   
  

    // Asignamos los valores obtenidos del perfil a los elementos del DOM
    if (nombre) {
        nombre. innerHTML = perfil.nombre || '';
    }

    if (correo) {
        correo.innerHTML = perfil.correo || '';
    }

    if (password) {
        password.innerHTML =  '*****************' || '';
    }
    if (fotoPerfil) {
        fotoPerfil.src = perfil.foto || 'default-foto.jpg'; // Si no tiene foto, se carga una predeterminada
    }
    
   if (perfil.direccion && perfil.direccion.length > 0) {
    const contenedorDirecciones = document.getElementById('direccionPerfil'); // Contenedor en tu HTML

    // Limpia el contenedor antes de agregar las direcciones (opcional)
        if(contenedorDirecciones){
            contenedorDirecciones.innerHTML = '';
        }
    // Itera sobre el array de direcciones
        perfil.direccion.forEach((direccion, index) => {
            // Crear un elemento para mostrar la dirección (puede ser un input, p, li, etc.)
            const elementoDireccion = document.createElement('p');
            elementoDireccion.innerHTML = `Dirección ${index + 1}:<br>${direccion.direccion}`;

        
            elementoDireccion.className = 'direccion-item'; // Clase para estilos si es necesario
            elementoDireccion.dir=direccion

            if(contenedorDirecciones){
                // Agrega el elemento al contenedor
                contenedorDirecciones.appendChild(elementoDireccion);
            }
            
        });
    } else {
        console.log('No hay direcciones disponibles.');
    }
    creditActual=document.getElementById("credito-actual-credito")
    if(creditActual){
        creditActual.textContent=perfil.monedero;
    }
    

    saldom=document.getElementById("saldoM")
    if(saldom){
        saldom.innerHTML=perfil.monedero;
        saldom.value=perfil.monedero;
    }
    
    
    if (monedero) {
        monedero.innerHTML= " "+perfil.monedero + "€" || '';
    }

   
   
   
   
    
}



async function actualizarMonedero(id, saldo) {

    try {
        // Log de los datos enviados
        console.log("Enviando datos:", JSON.stringify({id:id,monedero:saldo}));

        const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{id:id,monedero:saldo}]), 
        });


        // Validar la respuesta del servidor
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }


        // Procesar la respuesta
        const credit = await response.json();
        return credit;

    } catch (error) {
        console.error("Error al actualizar el monedero:", error.message);
        return null; // Devolver null si hay un error
    }
}



async function editarFicha(perfil) {
    let nombre = document.getElementById('nombrePerfil');
    let correo = document.getElementById('correoPerfil');
    let password = document.getElementById('passPerfil'); // Asegúrate de que este campo esté presente en tu HTML
    let editarbtn = document.getElementById('editarPerfil');
    let guardarbtn = document.createElement('button');
    let cancelarbtn = document.createElement('button');

    const user = JSON.parse(localStorage.getItem('User'));
    const id = user.id;

    // Cambiar el texto de los botones
    cancelarbtn.textContent = 'Cancelar';
    cancelarbtn.addEventListener('click', function () {
        // Volver al estado original de los datos
        nombre.innerHTML = perfil.nombre;
        correo.innerHTML = perfil.correo;
        password.innerHTML = '*****************';  // O puedes mostrar la contraseña oculta
        // Si tienes más campos que cambiar, agrégales aquí
        editarbtn.textContent = 'Editar';
        editarbtn.parentNode.appendChild(editarbtn);
        guardarbtn.remove();
        cancelarbtn.remove();
    });

    // Mostrar los botones
    editarbtn.parentNode.appendChild(guardarbtn);
    editarbtn.parentNode.appendChild(cancelarbtn);
    editarbtn.style.display = "none";  // Quitar el botón de editar

    guardarbtn.textContent = 'Guardar';

    if (nombre && correo && password) {
        // Convertir el nombre, el correo y la contraseña en campos de texto para editar
        nombre.innerHTML = `<input type="text" id="nombreInput" value="${perfil.nombre}" />`;
        correo.innerHTML = `<input type="text" id="correoInput" value="${perfil.correo}" />`;
        password.innerHTML = `<input type="password" id="passwordInput" value="${perfil.password}" />`; // Usamos type="password"
    }

    guardarbtn.addEventListener('click', async function () {
        let nombreInput = document.getElementById('nombreInput');
        let correoInput = document.getElementById('correoInput');
        let passwordInput = document.getElementById('passwordInput');

        // Actualizar el perfil con los nuevos valores
        perfil.nombre = nombreInput.value;
        perfil.correo = correoInput.value;
        perfil.password = passwordInput.value; // Si hay un campo de contraseña

        // Crear el objeto perfilModificado con los datos actuales
        const perfilModificado = [{
            id:id,
            nombre: perfil.nombre,
            correo: perfil.correo,
            password: perfil.password || ''
        }];
        console.log(id);
        console.log("El perfil  actualizado es:",JSON.stringify(perfilModificado)); 
        try {
            const response = await updateUser(id, perfilModificado); // Llamar a la función updateUser
            console.log(response); // Mostrar la respuesta del servidor
            // Si la actualización fue exitosa, actualizar la vista
            nombre.innerHTML = perfil.nombre;
            correo.innerHTML = perfil.correo;
            password.innerHTML = '*****************'; // Ocultar la contraseña con asteriscos (o la puedes omitir)
            editarbtn.style.display = "block";
            guardarbtn.remove();
            cancelarbtn.remove();
            
        } catch (error) {
            console.error('Error al guardar el perfil:', error);
        }
    });
}

function cerrarSesion(){

    localStorage.removeItem('User');
    window.location.href="?menu=cerrarSesion";
}

// Función para activar la edición de la foto al hacer clic
function activarEdicionFoto() {
    // Mostrar el botón de editar foto
    document.getElementById('editarFotoBtn').style.display = 'block';
    // Mostrar el input de tipo file
    document.getElementById('fileInput').style.display = 'block';
}

// Función para previsualizar la imagen seleccionada
function previewImage(event) {
    const file = event.target.files[0];
    
    // Verificar si el archivo es una imagen
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Mostrar la imagen seleccionada en el contenedor
            const fotoPerfilImg = document.getElementById('fotoPerfilImg');
            fotoPerfilImg.src = e.target.result; // El resultado de la carga es la URL de la imagen
        };
        
        reader.readAsDataURL(file); // Lee la imagen como una URL de datos
    } else {
        alert('Por favor selecciona una imagen.');
    }
}

// Función para guardar la foto seleccionada
function guardarFoto() {
    const fotoPerfilImg = document.getElementById('fotoPerfilImg').src;
    // Aquí puedes guardar la nueva imagen en el servidor o hacer lo que necesites con la imagen
    console.log("Foto guardada:", fotoPerfilImg);
    
    // Ocultar el input y el botón después de guardar
    document.getElementById('fileInput').style.display = 'none';
    document.getElementById('editarFotoBtn').style.display = 'none';
}


// Función para activar la edición de la foto al hacer clic
function activarEdicionFoto() {
    // Mostrar el botón de editar foto
    document.getElementById('editarFotoBtn').style.display = 'block';
    // Mostrar el input de tipo file para seleccionar una imagen
    document.getElementById('fileInput').style.display = 'block';
}

// Función para previsualizar la imagen seleccionada
function previewImage(event) {
    const file = event.target.files[0];
    
    // Verificar si el archivo es una imagen
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Mostrar la imagen seleccionada en el contenedor
            const fotoPerfilImg = document.getElementById('fotoPerfilImg');
            fotoPerfilImg.src = e.target.result; // El resultado de la carga es la URL de la imagen
        };
        
        reader.readAsDataURL(file); // Lee la imagen como una URL de datos
    } else {
        alert('Por favor selecciona una imagen.');
    }
}

// Función para editar el perfil
async function editarPerfil() {
    const nombre = document.getElementById('nombrePerfil');
    const correo = document.getElementById('correoPerfil');
    const password = document.getElementById('passPerfil');
    const fotoPerfilImg = document.getElementById('fotoPerfilImg');
    const fileInput = document.getElementById('fileInput');
    
    let editarbtn = document.getElementById('editarPerfil');
    let guardarbtn = document.createElement('button');
    let cancelarbtn = document.createElement('button');
    
    // Crear botones de guardar y cancelar
    cancelarbtn.textContent = 'Cancelar';
    cancelarbtn.addEventListener('click', function () {
        // Volver a los valores originales
        nombre.innerHTML = perfil.nombre;
        correo.innerHTML = perfil.correo;
        password.innerHTML = perfil.password;
        fotoPerfilImg.src = perfil.foto || 'default-foto.jpg';  // Volver a la foto original
        editarbtn.style.display = 'block';
        guardarbtn.remove();
        cancelarbtn.remove();
    });

    guardarbtn.textContent = 'Guardar';
    editarbtn.style.display = 'none';  // Ocultar el botón de editar

    // Mostrar los botones de guardar y cancelar
    editarbtn.parentNode.appendChild(guardarbtn);
    editarbtn.parentNode.appendChild(cancelarbtn);
    
    // Convertir los campos de texto en inputs para editar
    nombre.innerHTML = `<input type="text" id="nombreInput" value="${perfil.nombre}" />`;
    correo.innerHTML = `<input type="text" id="correoInput" value="${perfil.correo}" />`;
    password.innerHTML = `<input type="password" id="passwordInput" value="${perfil.password}" />`;
    
    // Cambiar la imagen de perfil a un input de tipo file
    fotoPerfilImg.insertAdjacentHTML('beforebegin', `<input type="file" id="fotoInput" accept="image/*" onchange="previewImage(event)" style="display: block; margin-top: 10px;">`);

    // Evento para guardar los cambios al hacer clic en el botón "Guardar"
    guardarbtn.addEventListener('click', async function () {
        const nombreInput = document.getElementById('nombreInput');
        const correoInput = document.getElementById('correoInput');
        const passwordInput = document.getElementById('passwordInput');
        const fotoInput = document.getElementById('fotoInput');
        
        // Si se seleccionó una nueva foto, se actualiza el src de la imagen
        let nuevaFoto = fotoPerfilImg.src;
        if (fotoInput.files && fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                nuevaFoto = e.target.result;
                // Aquí iría el código para guardar la foto en el servidor
            };
            reader.readAsDataURL(fotoInput.files[0]);
        }

        // Actualizar el perfil con los nuevos valores
        perfil.nombre = nombreInput.value;
        perfil.correo = correoInput.value;
        perfil.password = passwordInput.value;
        perfil.foto = nuevaFoto; // Asignar la nueva foto seleccionada
        
        // Crear el objeto de perfil modificado
        const perfilModificado = {
            nombre: perfil.nombre,
            correo: perfil.correo,
            password: perfil.password,
            foto: perfil.foto
        };

        try {
            // Aquí puedes realizar la solicitud para guardar el perfil actualizado
            const response = await updateUser(perfilModificado);
            console.log(response);
            // Si la actualización fue exitosa, actualizar la vista
            nombre.innerHTML = perfil.nombre;
            correo.innerHTML = perfil.correo;
            password.innerHTML = perfil.password;
            fotoPerfilImg.src = perfil.foto;
            guardarbtn.remove();
            cancelarbtn.remove();
            editarbtn.style.display = 'block';
        } catch (error) {
            console.error('Error al guardar el perfil:', error);
        }
    });
}












