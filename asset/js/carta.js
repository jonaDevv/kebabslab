window.addEventListener("load", function() {
    
   


        getKebabs()
        .then(json => {
        
        
            const cartaContenedor = document.getElementById('carta');
            if(cartaContenedor){
            cartaContenedor.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos elementos
            }
            // Iterar sobre los objetos del JSON
            json.forEach(item => {

                const kebabDiv = document.createElement('div');
                kebabDiv.classList.add('kbab');
                kebabDiv.kebab = item;
                // Agregar nombre y precio del kebab al contenido del div
                kebabDiv.style.backgroundImage = `url(/asset/img/pngwing.com.png)`;
            
            kebabDiv.textContent = `${item.nombre.toUpperCase()}`;

            
            
            
                
            
                // Añadir el div al contenedor
                cartaContenedor.appendChild(kebabDiv);
                

                var auxiliar = document.createElement("div");
                var auxiliar1= document.createElement("div");
                
                
            


                kebabDiv.addEventListener('mouseenter', function() {
                        
                        
                        // Guarda el contenido original del div
                        const originalContent = kebabDiv.innerHTML;
                    
                        // Vacia el contenido del div para mostrar los ingredientes
                        kebabDiv.innerHTML = "";
                        kebabDiv.style.backgroundImage = ``;
                        kebabDiv.style.boxSizing="border-box";
                        
                    
                        
                        fetch("/vistas/principal/producto.html")
                        .then(respuesta => respuesta.text())
                        .then(texto => {
                            
                            auxiliar1.innerHTML = texto;
                            auxiliar1.setAttribute("class", "prod-container");
                        
                            kebabDiv.appendChild(auxiliar1);
                        
                            auxiliar1.style.height = "100vh";
                            auxiliar1.style.width = "100vw";
                            

                            nombre=document.getElementById('nombre');
                            nombre.innerHTML = `${item.nombre.toUpperCase()}`;
                            descripcion=document.getElementById('descripcion');
                            descripcion.innerHTML = item.descripcion;
                            precio=document.getElementById('precio');
                            precio.innerHTML = item.precio + "€";
                            

                            ingredientes = item.ingredientes;
                            ingr = document.getElementById('ingrediente');
                            ingredientes.forEach(ingrediente => ingr.innerHTML +="<br>"+ ingrediente.nombre );
                            
                            
                            
                            
                        
                            
                            
                            
                            const pedirBtn = document.getElementById("Anadir");
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

                            //Ahora cogemos el boton editar y le asignamos un evento click para editar el elemento
                            const editarBtn = document.getElementById("editar");
                            if (editarBtn) {

                                    editarBtn.addEventListener("click", function() {
                                        
                                        listaIngredientes = document.getElementById("aIngrediente");
                                        


                                                        
                                            fetch("/vistas/principal/verKebabGusto.html")
                                            .then(respuesta => respuesta.text())
                                            .then(texto => {
                                                auxiliar.innerHTML = texto;

                                                cont=document.getElementsByClassName("carta-container")[0];
                                                cont.removeChild(cartaContenedor);
                                                cont.appendChild(auxiliar);
                                                auxiliar.style.display="block";

                                                
                                                const kebabEditado=editarKebab(kebabDiv.kebab);

                                                console.log(kebabEditado);


                                                
                                    
                                            
                                            })
                                            .catch(error => {
                                                console.error("Error al cargar", error);
                                            });

                                                        
                                    });

                                
                                } else {
                                    console.error("No se ha encontrado el botón de editar.");
                                }
                                        
                                
                                


                        })
                        .catch(error => {
                            console.error("Error al cargar", error);
                        });

                        
                        
                        
                        kebabDiv.originalContent = originalContent;
                            
                });
                
                kebabDiv.addEventListener('mouseleave', function() {
                
                    // Restaurar el contenido original cuando el ratón sale
                    if (kebabDiv.originalContent) {
                        kebabDiv.innerHTML = kebabDiv.originalContent;
                        kebabDiv.style.backgroundImage = `url(/asset/img/pngwing.com.png)`;
                    }
                    
                });
                

                })
                    

                
                
        });



    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });
