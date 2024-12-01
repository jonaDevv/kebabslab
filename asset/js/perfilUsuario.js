window.addEventListener('load', function () {
    
    
    // checkSession()
    // .then(json => {
        

        
    //     mostrarPerfil(json.id);
        

    //    

    //     return json;
    // })
    // .catch(error => {
    //     console.error('Hubo un error con la solicitud fetch:', error);
    // });

    

    recargar=document.getElementById('recargar');
        if (recargar) {
            recargar.addEventListener('click', function () {
                recargarMonedero()
            });

           
        }

    const modalCredito = document.getElementById("modal-credito");
    const us=JSON.parse(localStorage.getItem('User'));
    let dinero=0;
    getUsuario(us.id).then(json=>{
        const useri=json;
        mostrarPerfil(useri.id);
        dinero=useri.monedero;

        editarbtn = document.getElementById('editarPerfil');

        if (editarbtn) {
            editarbtn.addEventListener('click', function () {
                editarFicha(json);
            });
        }
    
    })


    addCreditBtn=document.getElementsByClassName("addCredito")[0]

        if(addCreditBtn)
        {    addCreditBtn.addEventListener("click",function(){

                
                cantidadCredito=document.getElementById("cantidad-credito")

                const nuevoSaldo=parseFloat(cantidadCredito.value)+parseFloat(dinero);
                
                
                actualizarMonedero(us.id,nuevoSaldo).then(json=>{
                   mostrarPerfil(us.id);
                   
                    
                })

                modalCredito.style.display = "none";
                
            })
        }

    cancelarBtn=document.getElementsByClassName("closeaddCredito")[0]
        if(cancelarBtn){
            cancelarBtn.addEventListener("click",function(){
                modalCredito.style.display = "none";
            })
        }
    
    
    
        





});






function recargarMonedero(){

   const  modalCredito = document.getElementById("modal-credito");

    if (modalCredito.style.display === "none") {
        modalCredito.style.display = "block";

    } else {
        modalCredito.style.display = "none";
    }

    
    
}





