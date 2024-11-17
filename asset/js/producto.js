window.addEventListener("load", function() {

   

    if (pedirBtn) {
        pedirBtn.addEventListener("click", function() {

            console.log("Botón de pedir presionado");
        });

    } else {
        console.error("No se ha encontrado el botón de pedir.");
    }



});
