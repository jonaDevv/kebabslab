window.addEventListener('load', function () {


    

    const tramitarbtn=document.getElementsByClassName("btnf btn-tramitar")[0]

    
    if(tramitarbtn){
        tramitarbtn.addEventListener("click",function(){
            
            tramitarPedido();
            
            
        })
    }

   






});




function mostrarFinalizarCompra(totalPagar, misaldo) {
        
    
   

    // Actualiza los valores al cargar la ventana
    document.getElementById("total-pagar").textContent = `${totalPagar.toFixed(2)}€`;
    document.getElementById("credito-monedero").textContent = `${misaldo}€`;
    document.getElementById("credito-final").textContent = `${(misaldo - totalPagar).toFixed(2)}€`;

    

}


// Función para añadir crédito
function añadirCredito() {
   

    
    addcredit = document.getElementById("modal-credito");
    if (addcredit.style.display === "none") {
        addcredit.style.display = "block";

    } else {
        addcredit.style.display = "none";
    }


}


const totalPagar=document.getElementById("total-pagar")

// Función para tramitar pedido
function tramitarPedido() {
        const misaldo=document.getElementById("saldoM").value
      
    if (misaldo >= totalPagar) {
        misaldo -= totalPagar;
        console.log(misaldo-totalPagar)
        
    } else {
        alert("No tienes suficiente crédito para completar la compra. Añade crédito primero.");
    }
}



// Actualiza los valores en la interfaz
function actualizarUI() {
    document.getElementById("credito-monedero").textContent = `${misaldo}€`;
    document.getElementById("credito-final").textContent = `${(misaldo - totalPagar).toFixed(2)}€`;
}