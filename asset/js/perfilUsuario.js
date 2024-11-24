window.addEventListener('load', function () {
    
    
    
        // Función para mostrar la imagen seleccionada desde la galería
    document.getElementById('inputGaleria').addEventListener('change', function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('fotoPerfilImg').src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });

    checkSession()
    .then(json => {
        // No es necesario hacer JSON.parse si json.user ya es un objeto
        const User = json; // User ya es un objeto

        console.log(User);
        mostrarPerfil(User);

        
        editarbtn=document.getElementById('editarPerfil');
    if(editarbtn){
        editarbtn.addEventListener('click',function(){
            editarFicha(User);
        })
    }
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });


    






});





 

// Función para activar la cámara y tomar una foto
function activarCamara() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();
                
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Crear un botón para tomar la foto
                const button = document.createElement('button');
                button.textContent = 'Capturar Foto';
                button.onclick = function() {
                    // Tomar la foto desde el canvas
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/png');
                    document.getElementById('fotoPerfilImg').src = dataUrl;
                    stream.getTracks().forEach(track => track.stop()); // Detener la cámara
                    document.body.removeChild(button);
                };
                document.body.appendChild(button);
            })
            .catch(function(error) {
                alert('No se puede acceder a la cámara.');
            });
    } else {
        alert('La cámara no está disponible en tu navegador.');
    }
}