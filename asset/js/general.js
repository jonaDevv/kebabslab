window.addEventListener("load", function() {

    
    openMenuKebab();
    openMenuProducto();

    cancelarBtn=document.getElementsByClassName("closeaddCredito")[0]
    if(cancelarBtn){
        cancelarBtn.addEventListener("click",function(){
            modalCredito.style.display = "none";
        })
    
    }

    cerrarSesionBtn=document.getElementsByClassName("cerrarsesion")[0]
    if(cerrarSesionBtn){
        cerrarSesionBtn.addEventListener("click",function(){
            cerrarSesion()
        })
    
    }
    
    

    
   

   

    

});
  


function openMenuKebab() {
            
    let kebabBtn = document.getElementById("menuKebab");
    let kebabContainer = document.createElement("div"); // Contenedor para el botón y el menú
    let navkebab;

    // Agregar el contenedor alrededor del botón
    if(kebabBtn){
    kebabBtn.parentNode.insertBefore(kebabContainer, kebabBtn);

    kebabContainer.appendChild(kebabBtn); // Mover el botón dentro del contenedor
    
    kebabBtn.addEventListener("mouseenter", function() {
        
        // Crear el menú
        if (!navkebab) {
            navkebab = document.createElement("nav");
            navkebab.classList.add("nav-kebab");

            navkebab.innerHTML = `
                <ul>
                    <li><a href="?menu=carta">Carta Kebab</a></li>
                    
                    <li><a href="?menu=gusto">Kebab al Gusto</a></li>
                </ul>
            `;

            navkebab.style.display = "block";
            kebabContainer.appendChild(navkebab);
        }
    });
}
    kebabContainer.addEventListener("mouseleave", function() {
        // Verificar si el ratón está fuera del contenedor
        setTimeout(() => { // Usamos un timeout para asegurarnos que no se borre el menú antes de movernos al contenido del menú
            if (!kebabContainer.matches(":hover")) {
                if(navkebab){
                navkebab.remove();
                navkebab = null;
                }
            }
        }, 100);
    });
}



function openMenuProducto() {
            
    let productoBtn = document.getElementById("menuProductos");
    let productoContainer = document.createElement("div"); // Contenedor para el botón y el menú
    let navproducto;

    // Agregar el contenedor alrededor del botón
    if(productoBtn){
    productoBtn.parentNode.insertBefore(productoContainer, productoBtn);

    productoContainer.appendChild(productoBtn); // Mover el botón dentro del contenedor
    
    productoBtn.addEventListener("mouseenter", function() {
        
        // Crear el menú
        if (!navproducto) {
            navproducto = document.createElement("nav");
            navproducto.classList.add("nav-producto");

            navproducto.innerHTML = `
                <ul>
                    <li><a href="?menu=gkebab">Gestión Kebab</a></li>
                    
                    <li><a href="?menu=gingrediente">Gestión Ingredientes</a></li>

                    <li><a href="?menu=galergeno">Gestión Alergenos</a></li>
                </ul>
            `;

            navproducto.style.display = "block";
            productoContainer.appendChild(navproducto);
        }
    });
}
    productoContainer.addEventListener("mouseleave", function() {
        // Verificar si el ratón está fuera del contenedor
        setTimeout(() => { // Usamos un timeout para asegurarnos que no se borre el menú antes de movernos al contenido del menú
            if (!productoContainer.matches(":hover")) {
                if(navproducto){
                navproducto.remove();
                navproducto = null;
                }
            }
        }, 100);
    });
}








