

async function checkSession() {

    const response = await fetch('/Api/Api_sesion.php');
    
      const sesion = await response.json();
    
    
      return sesion.user;
}




function mostrarPerfil(perfil) {
    // Suponiendo que el objeto perfil tiene campos como nombre, correo y foto
    const nombre = document.getElementById('nombrePerfil');
    const correo = document.getElementById('correoPerfil');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const direcciones = document.getElementById('direccionPerfil');
    const monedero = document.getElementsByClassName('saldoPerfil')[0];

    // Asignamos los valores obtenidos del perfil a los elementos del DOM
    if (nombre) {
        nombre. innerHTML = perfil.nombre || '';
    }

    if (correo) {
        correo.innerHTML = perfil.correo || '';
    }

    if (fotoPerfil) {
        fotoPerfil.src = perfil.foto || 'default-foto.jpg'; // Si no tiene foto, se carga una predeterminada
    }

    if (direcciones) {
        direcciones.value = perfil.direcciones || '';
    }

    if (monedero) {
        monedero.innerHTML+= " "+perfil.monedero + "€" || '';
    }

    // Si deseas agregar más campos, como direcciones o pedidos, puedes hacerlo aquí
    // ejemplo: mostrar direcciones, pedidos, etc.
}


function recargarMonedero(){
  
}

function agregarDireccion(){
  
}

function editarFicha(perfil) {
    let nombre = document.getElementById('nombrePerfil');
    let correo = document.getElementById('correoPerfil');
    let editarbtn = document.getElementById('editarPerfil');
    let guardarbtn = document.createElement('button');
    editarbtn.parentNode.appendChild(guardarbtn);
    guardarbtn.textContent = 'Guardar';
    guardarbtn.addEventListener('click', function () {
        let nombreInput = document.getElementById('nombreInput');
        let correoInput = document.getElementById('correoInput');
        perfil.nombre = nombreInput.value;
        perfil.correo = correoInput.value;
        console.log(perfil);
        mostrarPerfil(perfil);
    });
    
    if (nombre && correo) {
        // Convertir el nombre y el correo en campos de texto
        nombre.innerHTML = `<input type="text" id="nombreInput" value="${perfil.nombre.toUpperCase()}" />`;
        correo.innerHTML = `<input type="text" id="correoInput" value="${perfil.correo}" />`;
    }
}
