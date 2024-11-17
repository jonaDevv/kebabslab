window.addEventListener("load", function() {

    crearBtn = document.getElementsByClassName("admi-crear")[0];
    const auxiliar = document.createElement("div");
    crearBtn.addEventListener("click", function() {
        
        console.log("Botón de crear presionado");

        fetch("/vistas/principal/crearKebab.html")
            .then(respuesta => respuesta.text())
            .then(texto => {
                auxiliar.innerHTML = texto;

                cont=document.getElementById("cuerpo");
                cont.innerHTML = "";
                cont.appendChild(auxiliar);
                auxiliar.style.display="block";
                
            
                
                    
                    
                       
            
            })
            .catch(error => {
                console.error("Error al cargar", error);
            });
        
        
    });












});
  
    // Obtiene todos los elementos con la clase 'header-container'