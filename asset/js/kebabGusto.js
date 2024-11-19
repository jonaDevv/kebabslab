window.addEventListener("load", function() {
    
        listaIngredientes();

        //Cogemos el boton pedir t le asignamos un evento click para añadir elementos al carrito
        
        contenedorVista = document.getElementsByClassName('vistaKebab');

       



        const pedirBtn = document.getElementById("pedir");
        
        if (pedirBtn) {
            pedirBtn.addEventListener("click", function() {
    
                const carrito = document.getElementById("carrito");
                carrito.style.display="none";
                carrito.innerHTML += item;
                                    
                const count = document.getElementsByClassName("carrito-count")[0];

                // Convierte count.innerHTML a número y suma 1
                count.innerHTML = (parseInt(count.innerHTML) || 0) + 1;

                console.log("hola");

                
            });

        } else {
            console.error("No se ha encontrado el botón de pedir.");
        }

        


        //Me cargo descripcion del kebab

        
       










});


function listaIngredientes(){

   
    fetch("/Api/Api_ingrediente.php",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => {
        
        json.forEach(item => {

            const ingredienteDiv = document.createElement('div');
            
            
            ingredienteDiv.style.margin = "0px";
            ingredienteDiv.style.borderRadius = "10px";
            ingredienteDiv.style.border = "1px solid black";
            ingredienteDiv.style.boxSizing = "border-box";
            ingredienteDiv.style.backgroundColor="#f39c12";
            ingredienteDiv.style.color="white";
            ingredienteDiv.style.fontWeight="bold";
            ingredienteDiv.style.width="100%";
            ingredienteDiv.style.height="10%";
            ingredienteDiv.style.textAlign="center";
            ingredienteDiv.style.marginBottom="5px";


            
            ingredienteDiv.classList.add('listaIngrediente');
            ingredienteDiv.ingrediente = item;

            // Agregar nombre y precio del kebab al contenido del div
            ingredienteDiv.textContent = `${ingredienteDiv.ingrediente.nombre}  ${ingredienteDiv.ingrediente.precio} €`;
            
            const aingredientes=document.getElementById("aIngrediente");
            const ingredientesKebab=document.getElementById("ingrediente");
            const precioKebab=document.getElementById("precio");
            const alerge=document.getElementById("alergenos");
            alerge.grupoAlergenos = new Map();  // Inicializamos el Map
            // Añadir el div al contenedor
            aingredientes.appendChild(ingredienteDiv);


            ingredienteDiv.addEventListener("click",function(ev){

                


                if (ingredienteDiv.parentNode.id=="aIngrediente") {
                    
                    ingredientesKebab.appendChild(ingredienteDiv);
                    ingredientesKebab.appendChild(ingredienteDiv);

                    
                    precioKebab.innerHTML = (parseFloat(precioKebab.innerHTML)) + ingredienteDiv.ingrediente.precio + " €";
                }else{
                    
                    ingredienteDiv.parentNode.removeChild(ingredienteDiv);
                    aingredientes.appendChild(ingredienteDiv);
                    precioKebab.innerHTML = (parseFloat(precioKebab.innerHTML)) - ingredienteDiv.ingrediente.precio + " €";

                }
                
                
                // Iteramos sobre los alérgenos del ingrdiente para ir actualizando los alergenos
                item.alergenos.forEach(alergeno => {
                    // Verificamos si el alérgeno ya existe en el Map
                    if (!alerge.grupoAlergenos.has(alergeno.nombre)) {
                        // Si no está, lo agregamos al Map
                        alerge.grupoAlergenos.set(alergeno.nombre, true);  // 'true' como valor solo para marcarlo como existente
                        // También agregamos el nombre del alérgeno al innerHTML
                        alerge.innerHTML += alergeno.nombre + "<br>";
                    }
                });
                                
                precioTotal = 0;  // Inicializamos el total de precio
               
                
                
                
                
                  // Mostramos el precio total en el DOM

                 
                console.log(ingredientesKebab);
                
                



            });


            // ingredientesKebab.addEventListener("click",function(){

            //         // Iteramos sobre los alérgenos del item
            //         item.alergenos.forEach(alergeno => {
            //             // Verificamos si el alérgeno ya existe en el Map
            //             if (alerge.grupoAlergenos.has(alergeno.nombre)) {
            //                 alerge.grupoAlergenos.delete(alergeno.nombre);
    
            //                 // Ahora eliminamos el nombre del alérgeno de innerHTML
            //                 // Necesitamos eliminar la línea correspondiente en innerHTML
            //                 alerge.innerHTML = alerge.innerHTML.replace(alergeno.nombre + "<br>", "");
            //             }
            //         });
                        
            //     //      // Asegurarse de que el precio en precioKebab es un número
            //     // let currentPrice = parseFloat(precioKebab.innerHTML.replace(' €', '')) || 0; // Limpiar símbolo €
                
            //     // // Restamos el precio del ingrediente
                
            //     // precioKebab.innerHTML = (currentPrice - currentPrice) + " €";
                
                
            //     precioKebab.innerHTML = (parseFloat(precioKebab.innerHTML) || 0) - item.precio + " €";
                
                    
                
                
            // });







        });

    })
    .catch(error => console.log(error));




    



}

function cobrarATuGusto(kebab){


    kebab.ingredientes.sort((a, b) => b.precio - a.precio);

    for(let i=0;i<kebab.ingredientes.length-3;i++){

        total += kebab.ingredientes[i].precio;


    }


    return total;



}


async function obtenerKebab(kebab) {
    try {
        // Realizar el fetch y esperar la respuesta
        const respuesta = await fetch('Api/Api_kebab.php?id=' + kebab.id,);
        
        // Verificar si la respuesta es exitosa (HTTP status 200-299)
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status} - ${respuesta.statusText}`);
        }

        // Convertir la respuesta a JSON
        const datos = await respuesta.json();

        // Mostrar los datos obtenidos
        console.log("Datos del kebab:", datos);
        return datos; // Devolver los datos si los necesitas




    } catch (error) {
        // Manejo de errores
        console.error("Error al obtener el kebab:", error);
    }
}


