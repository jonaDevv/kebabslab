window.addEventListener("load", function() {
  
    // Obtiene todos los elementos con la clase 'header-container'
    const headerContainers = document.getElementsByClassName("header-container");
    
    
  
    // Convertir la colección de elementos a un array para usar forEach
    Array.from(headerContainers).forEach(function(headerContainer) {
      
      // Agregar el event listener a cada 'header-container' individualmente
      headerContainer.addEventListener("dblclick", function() {
                
        let menu = document.getElementsByClassName("nav-admin")[0];

        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
       

        
      });
  
    });
    
});
