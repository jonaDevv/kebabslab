window.addEventListener("load", function() {
    
    

    
        const url = 'http://www.kebabslab.com/Api/Api_kebab.php'; // URL de la API
    
        // Usando el método GET con fetch
        // Crear un objeto Request
        const peticion = new Request(url, {
            method: 'GET',  // Método GET
            headers: {
                'Content-Type': 'application/json',  // Si deseas enviar o recibir datos en formato JSON
            }
        });

        fetch(peticion)
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(json => {
            console.log(json);  // Añadir este log para ver la respuesta completa
            
            const cartaContenedor = document.getElementById('carta');
            cartaContenedor.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos elementos
        
            // Iterar sobre los objetos del JSON
            json.forEach(item => {
                const kebabDiv = document.createElement('div');
                kebabDiv.classList.add('kbab');
                kebabDiv.kebab = item;
                // Agregar nombre y precio del kebab al contenido del div
                kebabDiv.style.backgroundImage = `url(/asset/img/pngwing.com.png)`;
               
               kebabDiv.textContent = `${item.nombre.toUpperCase()}`;
               kebabDiv.style.textAlign = "end";
                
               
                // Añadir el div al contenedor
                cartaContenedor.appendChild(kebabDiv);
                

                var auxiliar = document.createElement("div");
                var auxiliar1= document.createElement("div");

                kebabDiv.addEventListener('dblclick', function() {
                    // Traer la plantilla del login
                    fetch("/vistas/principal/producto.html")
                    .then(respuesta => respuesta.text())
                    .then(texto => {
                        auxiliar.innerHTML = texto;

                        cont=document.getElementsByClassName("carta-container")[0];
                        cont.removeChild(cartaContenedor);
                        cont.appendChild(auxiliar);
                        auxiliar.style.display="block";
                        
            
                        
                            
                            
                               
                    
                    })
                    .catch(error => {
                        console.error("Error al cargar", error);
                    });

                   
                
                })


                kebabDiv.addEventListener('mouseenter', function() {
                        
                        
                        // Guarda el contenido original del div
                        const originalContent = kebabDiv.innerHTML;
                    
                        // Vacia el contenido del div para mostrar los ingredientes
                        kebabDiv.innerHTML = "";
                        kebabDiv.style.backgroundImage = ``;
                        kebabDiv.style.height = "30%";
                        kebabDiv.style.width = "20%";
                    
                        
                        fetch("/vistas/principal/producto.html")
                        .then(respuesta => respuesta.text())
                        .then(texto => {
                            
                            auxiliar1.innerHTML = texto;
                        
                            kebabDiv.appendChild(auxiliar1);

                            nombre=document.getElementById('nombre');
                            nombre.innerHTML = item.nombre;
                            descripcion=document.getElementById('descripcion');
                            descripcion.innerHTML = item.descripcion;
                            precio=document.getElementById('precio');
                            precio.innerHTML = item.precio;
                            
                            ingredientes = item.ingredientes;
                            ingr = document.getElementById('ingrediente');
                            ingredientes.forEach(ingrediente => ingr.innerHTML +="<br>"+ ingrediente.nombre );
                            
                            console.log(ingredientes);
                            
                            
                        
                            
                            
                            
                            const pedirBtn = document.getElementById("Anadir");
                            if (pedirBtn) {
                                pedirBtn.addEventListener("click", function() {
    
                                    const carrito = document.getElementById("carrito");

                                    carrito.innerHTML = item;

                                    console.log(carrito);
                                });
    
                            } else {
                                console.error("No se ha encontrado el botón de pedir.");
                            }
                            
                            console.log(ingredientes);


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
                

                
                    

                   

                     
            });
        })
        .catch(error => {
            console.error('Hubo un error con la solicitud fetch:', error);
        });
        
       





});