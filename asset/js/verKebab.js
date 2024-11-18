window.addEventListener("load", function() {
    
    

        //Cogemos el boton pedir t le asignamos un evento click para añadir elementos al carrito
        contenedorVista = document.getElementsByClassName('vistaKebab');

        const pedirBtn = document.getElementsByClassName("pedir")[0];
        if (pedirBtn) {
            pedirBtn.addEventListener("click", function() {
    
                const carrito = document.getElementById("carrito");
                carrito.style.display="none";
                carrito.innerHTML += item;
                                    
                const count = document.getElementsByClassName("carrito-count")[0];

                // Convierte count.innerHTML a número y suma 1
                count.innerHTML = (parseInt(count.innerHTML) || 0) + 1;

                
            });

        } else {
            console.error("No se ha encontrado el botón de pedir.");
        }

        console.log(contenedorVista);

        //Ahora cogemos el boton editar y le asignamos un evento click para editar el elemento
        const editarBtn = document.getElementById("editar");
        if (editarBtn) {
            editarBtn.addEventListener("click", function() {
                
                listaIngredientes = document.getElementById("aIngrediente");
                console.log (listaIngredientes);

                
            });
        
        } else {
            console.error("No se ha encontrado el botón de editar.");
        }






});