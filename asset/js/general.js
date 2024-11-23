window.addEventListener("load", function() {

    
    openMenuKebab();
   
    


    

});
  
    // Obtiene todos los elementos con la clase 'header-container'



//Coger menu kebab






function openMenuKebab() {
            
    let kebabBtn = document.getElementById("menuKebab");
    let kebabContainer = document.createElement("div"); // Contenedor para el botón y el menú
    let navkebab;

    // Agregar el contenedor alrededor del botón
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





