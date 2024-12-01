window.addEventListener('load', function () {


    

       
        
   






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









// Actualiza los valores en la interfaz
function actualizarUI() {
   
    document.getElementById("credito-monedero").textContent = `${misaldo}€`;
    document.getElementById("credito-final").textContent = `${(misaldo - totalPagar).toFixed(2)}€`;
}