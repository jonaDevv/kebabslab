window.addEventListener('load', function () {
    
    galeria= document.getElementById('inputGaleria');
    
    if (galeria){
            // Función para mostrar la imagen seleccionada desde la galería
        galeria.addEventListener('change', function(event) {
            const archivo = event.target.files[0];
            if (archivo) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('fotoPerfilImg').src = e.target.result;
                };
                reader.readAsDataURL(archivo);
            }
        });
    }
    
    checkSession()
    .then(json => {
        // Guardamos el usuario en localStorage
        localStorage.setItem('User', JSON.stringify(json));

        
        mostrarPerfil(json.id);
        

        editarbtn = document.getElementById('editarPerfil');
        if (editarbtn) {
            editarbtn.addEventListener('click', function () {
                editarFicha(json);
            });
        }

        return json;
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });

    
    recargar=document.getElementById('recargar');
        if (recargar) {
            recargar.addEventListener('click', function () {
                recargarMonedero()
            });

           
        }



    const useri=JSON.parse(localStorage.getItem('User'));
    cancelarBtn=document.getElementsByClassName("closeaddCredito")[0]
    if(cancelarBtn){
        cancelarBtn.addEventListener("click",function(){
            modalCredito.style.display = "none";
        })
    }
    addCreditBtn=document.getElementsByClassName("addCredito")[0]

    if(addCreditBtn)
    {    addCreditBtn.addEventListener("click",function(){

            
            cantidadCredito=document.getElementById("cantidad-credito")
            
            actualizarMonedero(useri.id,cantidadCredito.value).then(json=>{
                console.log(json);
                mostrarPerfil(useri.id);
                
                
            })
            modalCredito.style.display = "none";
            
        })
    }

    






});






function recargarMonedero(){

    modalCredito = document.getElementById("modal-credito");

    if (modalCredito.style.display === "none") {
        modalCredito.style.display = "block";

    } else {
        modalCredito.style.display = "none";
    }

    
    
}





