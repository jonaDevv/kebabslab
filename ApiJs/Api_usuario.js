

function checkSession() {
    fetch('/Api/Api_sesion.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta procesada del servidor:', data);  // Añadir este log
            
            if (data.status === 'success' && data.user) {
                console.log('Sesión activa', data.user);
                cargarPerfil(data.user.id);
            } else {
                console.log('No hay sesión activa:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión:', error);
        });
}




async function cargarPerfil(id) {
    const response = await fetch('/Api/Api_usuario.php?id=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const usuario = await response.json();

    console.log('Usuario cargado:', usuario); // Agrega este log para ver qué datos devuelve la API
    return usuario;
}


function mostrarPerfil(perfil) {
    // Suponiendo que el objeto perfil tiene campos como nombre, correo y foto
    const nombre = document.getElementById('nombrePerfil');
    const correo = document.getElementById('correoPerfil');
    const fotoPerfil = document.getElementById('fotoPerfil');

    // Asignamos los valores obtenidos del perfil a los elementos del DOM
    if (nombre) {
        nombre.value = perfil.nombre || '';
    }

    if (correo) {
        correo.value = perfil.correo || '';
    }

    if (fotoPerfil) {
        fotoPerfil.src = perfil.foto || 'default-foto.jpg'; // Si no tiene foto, se carga una predeterminada
    }

    // Si deseas agregar más campos, como direcciones o pedidos, puedes hacerlo aquí
    // ejemplo: mostrar direcciones, pedidos, etc.
}

