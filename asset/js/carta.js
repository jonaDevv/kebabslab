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
                            

                            nombre=document.getElementById('name');
                            nombre.innerHTML = `${item.nombre.toUpperCase()}`;
                            descripcion=document.getElementById('description');
                            descripcion.innerHTML = item.descripcion;
                            precio=document.getElementById('price');
                            precio.innerHTML = item.precio + "€";
                            

                            ingredientes = item.ingredientes;
                            ingr = document.getElementById('ingredient');
                            ingredientes.forEach(ingrediente => ingr.innerHTML +="<br>"+ ingrediente.nombre );
                            
                            
                            
                            
                        
                            
                            
                            
                            const pedirBtn = document.getElementById("add");
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
                            const editarBtn = document.getElementById("edit");
                            if (editarBtn) {

                                    editarBtn.addEventListener("click", function() {


                                                                    // Verificar si ya existe el modal y el overlay
                                        let overlay = document.querySelector(".kebab-overlay");
                                        let contenedor = document.querySelector("#CModal");

                                        if (!overlay) {
                                            // Crear el fondo oscuro detrás del modal si no existe
                                            overlay = document.createElement("div");
                                            overlay.setAttribute("class", "kebab-overlay");
                                            document.body.appendChild(overlay);
                                        } else {
                                            overlay.style.display = "block"; // Mostrar si ya existe
                                        }

                                        
                                        if (!contenedor) {
                                            // Crear el contenedor del modal si no existe
                                            contenedor = document.createElement("div");
                                            contenedor.setAttribute("id", "CModal");
                                            contenedor.setAttribute("class", "kebabmodal");
                                            document.body.appendChild(contenedor);
                            
                                            // Crear contenido del carrito
                                            fetch("/vistas/principal/verKebabGusto.html")
                                                .then((respuesta) => respuesta.text())
                                                .then((texto) => {
                                                    contenedor.innerHTML = texto;
                                                    editarKebab(kebabDiv.kebab);
                                                    // Acceder a los elementos después de que estén en el DOM
                                                    const closeBtn = contenedor.querySelector(".closeKebab");
                                                    const pideBtn = contenedor.querySelector("#pedir");
                                                    
                            
                                                    
                            
                                                    // Cerrar el modal al hacer clic en la "X"
                                                    if (closeBtn) {
                                                        closeBtn.addEventListener("click", function () {
                                                            contenedor.style.display = "none";
                                                            overlay.style.display = "none";
                                                            window.location.reload();
                                                            
                                                        });
                                                    }

                                                    carro.
                                                    if (pideBtn) {

                                                        pideBtn.addEventListener("click", function () {
                                                        alert("pedir");

                                                            contenedor.style.display = "none";
                                                            overlay.style.display = "none";
                                                            anadirCarrito(kebabDiv.kebab);
                                                            


                                                        });
                                                    }



                            
                                                    
                                                })
                                                .catch((error) => {
                                                    console.error("Error al cargar la plantilla del carrito:", error);
                                                });
                                        } else {
                                            contenedor.style.display = "block"; // Mostrar si ya existe
                                        }

                                                        
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
