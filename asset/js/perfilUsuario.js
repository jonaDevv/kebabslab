window.addEventListener('load', function () {
    
    
    checkSession()
    .then(json => {
        

        
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

            const nuevoSaldo=parseFloat(cantidadCredito.value)+parseFloat(useri.monedero);
            console.log(nuevoSaldo);
            
            actualizarMonedero(useri.id,nuevoSaldo).then(json=>{
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





