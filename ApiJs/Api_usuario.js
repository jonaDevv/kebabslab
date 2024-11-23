

function checkSession() {
    fetch('/Api/Api_sesion.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Log para inspeccionar la respuesta
            console.log('Respuesta del servidor:', response);
            return response.json();
        })
        .then(data => {
            console.log('Respuesta procesada del servidor:', data);
            
            if (data.status === 'success' && data.user) {
                console.log('Sesión activa', data.user);
            } else {
                console.log('No hay sesión activa:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión:', error);
        });
}