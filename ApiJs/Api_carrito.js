
const user=JSON.parse(localStorage.getItem('User'));
let carritoData = [];
carritoData=getCarritoLocalStorage(user);
actualizarCarritoUI();




async function anadirCarrito(kebab) {
   var direccion ="";
    try {

        direccion = await getDireccionId(user.id);
        
       
    } catch (error) {
        console.error("Ocurrió un error al obtener la dirección:", error);
        alert("Debe estar logeado para poder añadir elementos al carrito");
    }
   
      carritoData.push({
            usuario_id: user.id ,
            lineasPedido: [
                {
                    
                    kebabs: [{
                    
                        id: kebab.id,
                        kebab: kebab.nombre,
                        ingredientes: kebab.ingredientes,
                        precio: kebab.precio
                    }],
                    precio: kebab.precio,  // El precio total de la línea es el precio del primer kebab
                    cantidad: 1,  // Nueva propiedad cantidad
                    //
                }
                
            ],
            direccion: direccion.direccion,
            precio_total: calcularPrecioCarritoTotal()

        });
       
    actualizarCarritoUI();
    saveCarritoLocalStorage(carritoData,user);
   
    
}

async function encargarPedido(carritoData){

    const response = await fetch('/Api/Api_ProcesarPedido.php', {


        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carritoData)   
        
    });
    
      const sesion = await response;
    
    
      return sesion;

}



// Función para calcular el precio total de una línea de pedido (sumando el precio de todos los kebabs dentro)
function calcularPrecioTotal(linea) {
    return linea.kebabs.reduce((total, kebab) => total + kebab.precio, 0);
}

// Calcular el precio total de todo el carrito
function calcularPrecioCarritoTotal() {
    let total = 0;

    // Recorre todas las líneas de pedido en el carrito
    carritoData.forEach(item => {
        item.lineasPedido.forEach(linea => {
            // Recalcula el precio total de la línea
            linea.precioTotal = calcularPrecioTotal(linea);  // Asegurarse de que el precio de cada línea esté actualizado
            // Suma el precio total de la línea de pedido al total global
            total += linea.precioTotal;
        });
    });

   
    return total;
}




function actualizarCarritoUI() {
    const carritoContainer = document.getElementById("carrito");
    
    if(carritoContainer){
        carritoContainer.innerHTML = "";  
    }
        // Limpiar el contenedor

    carritoData.forEach(item => {

        item.lineasPedido.forEach(linea => {
            const kebabDiv = document.createElement("div");
            kebabDiv.classList.add("kebab-en-carrito");
            kebabDiv.id = `kebab-${linea.id}`;
            kebabDiv.kebab = item;

            // Contamos las cantidades de cada tipo de kebab
            let kebabsSummary = linea.kebabs.reduce((summary, kebab) => {
                if (summary[kebab.kebab]) {
                    summary[kebab.kebab].cantidad++;
                    summary[kebab.kebab].precioTotal += kebab.precio;
                } else {
                    summary[kebab.kebab] = {
                        cantidad: 1,
                        precioTotal: kebab.precio
                    };
                }
                return summary;
            }, {});

            // Generar el HTML con las cantidades y los precios totales
            let kebabsHtml = Object.keys(kebabsSummary).map(kebabName => {
                let kebabData = kebabsSummary[kebabName];
                return `<div>${kebabName} x${kebabData.cantidad} ${kebabData.precioTotal}€</div>`;
            }).join('');

            kebabDiv.innerHTML = `
                <div>${kebabsHtml}</div>
                
            `;
            carritoContainer.appendChild(kebabDiv);
        });

        item.precio_total = calcularPrecioCarritoTotal().toFixed(2);


    });



    // Actualizar el contador total de items en el carrito
    const count = document.querySelector(".carrito-count");
    const totalItems = carritoData.reduce((sum, item) => sum + item.lineasPedido.reduce((subSum, linea) => subSum + linea.kebabs.length, 0), 0);
    if(count){
        count.textContent = totalItems > 0 ? totalItems : "";
    }
    


    // Calcular y mostrar el precio total del carrito
    const totalCarrito = calcularPrecioCarritoTotal();
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = `Total carrito: ${totalCarrito.toFixed(2)}€`;
    }

   return totalCarrito;
}





function rellenarCarrito() {
    // Obtiene el carrito y el contenedor del modal
    const carrito = document.getElementById("carrito");

    const modalCarritoContainer = document.getElementsByClassName("carrito-container")[0];

    if (!modalCarritoContainer) {
        console.log("No se encontró el contenedor del modal del carrito.");
        return;
    }

    // Limpia el contenido del modal para evitar duplicados
    modalCarritoContainer.innerHTML = '';

   

    // Copia los kebabs del carrito al modal
    const kebabsEnCarrito = carrito.children; // Obtiene los elementos en el carrito
    
    Array.from(kebabsEnCarrito).forEach(kebab => {
        const modalKebabDiv = document.createElement('div');
        modalKebabDiv.classList.add('modal-kebab-item');
        modalKebabDiv.textContent = kebab.textContent; // Copia el contenido textual del kebab
         // Agrega el kebab al modal
        console.log(kebab);

        // Agrega el kebab al modal
        modalCarritoContainer.appendChild(modalKebabDiv);
    });

    const totalElement = document.getElementById("total");
    // Calcular y mostrar el precio total del carrito
    const totalCarrito = calcularPrecioCarritoTotal();
    
    console.log(totalElement);
    if (totalElement) {
        totalElement.textContent = `${totalCarrito.toFixed(2)}€`;
    }
   
}


function vaciarCarrito() {
    // Vacia el carrito
    
    const modalCarritoContainer = document.getElementsByClassName("carrito-container")[0];
    modalCarritoContainer.innerHTML = '';
    
    const carrito = document.getElementById("carrito");
    carrito.innerHTML = '';

    // Actualizar el contador total de items en el carrito
    const count = document.getElementsByClassName("carrito-count")[0];
    count.innerHTML = "";


    carritoData=[];
    const totalElement = document.getElementById("total");
     totalElement.innerHTML= "0.00€";

    localStorage.removeItem(`carrito${user.id}`);

    enviarCorreo('Prueba de cuerpo de correo', 'ejemplo@correo.com');
    

}

function tramitarPedido(){
    
    let totalPagar=document.getElementById("total-pagar").textContent;
    totalPagar=parseFloat(totalPagar.replace('€', '').trim());
    let newMonedero=parseFloat(user.monedero)-parseFloat(totalPagar);
    const carritoData=getCarritoLocalStorage(user);
    console.log(carritoData)
    if(carritoData.length>0){

        getUsuario(user.id).then(user=>{
            console.log("Lo que pagaste es:",totalPagar)
            console.log("Tu dinero es:",parseFloat(user.monedero))
            console.log(user)
            console.log(carritoData)

            if(user.monedero>=totalPagar){
                
                
                
                actualizarMonedero(user.id,newMonedero);
                
                
                createPedido(carritoData).then(json => {
                    
                    console.log("¡Pedido tramitado con éxito!");
                    console.log(json); 
                    
                   
                })
                .catch(error => {
                    console.error('Hubo un error con la solicitud fetch:', error);
                });
                
                //Restamos el dinero del monedero del user.

                 window.location.reload();
            }else{
                return alert("No tienes suficiente dinero para pagar");
            }
        })
           
            modalFinalizarcompra= document.getElementsByClassName("finalizar-compra-container")[0]
            modalCarritoContainer= document.getElementById("CModal")
            overlayCarrito= document.getElementsByClassName("carrito-overlay")[0]
            if(modalFinalizarcompra && modalCarritoContainer){
                
               
                modalCarritoContainer.style.display = "none";
            }
            if(modalFinalizarcompra){
                modalFinalizarcompra.remove()
                overlayCarrito.remove()
                vaciarCarrito()
                
                
            }
           
       
  
    }else{
        alert("El carrito está vacío");
    }

   

}

function saveCarritoLocalStorage(carritoData,user){

    localStorage.setItem(`carrito${user.id}`, JSON.stringify(carritoData));
    
}

function getCarritoLocalStorage(user){

    if(user){

        const carrito = JSON.parse(localStorage.getItem(`carrito${user.id}`));
        return carrito  || [];

    }else{
        return [];
    }
    
     

}

function estadoCarrito(){

    if (!user) {
        carritoData = [];  // Vaciar el carrito si no hay usuario
        console.log("El usuario no está autenticado, el carrito se muestra vacío.");
    } else {
        // Si hay usuario, cargar el carrito desde el Local Storage
        carritoData = getCarritoLocalStorage();  // Cargar el carrito si el usuario está autenticado
        console.log("El carrito se cargó con los datos del Local Storage.");
    }
}



