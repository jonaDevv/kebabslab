// Array global para gestionar el carrito
let carritoData = [];
const user=JSON.parse(localStorage.getItem('User'));

function anadirCarrito(kebab) {

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
            precio_total: calcularPrecioCarritoTotal()
        });
        console.log(`Añadido kebab con ID ${kebab.id} como nueva línea de pedido.`);
    // }
   
    actualizarCarritoUI();

     
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

    console.log("Total calculado:", total);  // Verifica que el total se calcule correctamente
    return total;
}




function actualizarCarritoUI() {
    const carritoContainer = document.getElementById("carrito");
    carritoContainer.innerHTML = "";  // Limpiar el contenedor

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
    count.textContent = totalItems;

    // Calcular y mostrar el precio total del carrito
    const totalCarrito = calcularPrecioCarritoTotal();
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = `Total carrito: ${totalCarrito.toFixed(2)}€`;
    }

   return totalCarrito;
}

// Función para enviar el carrito al servidor
function meterCarritoUser(carro) {
    let carritoTexto = JSON.stringify(carro);

    fetch("/Api/Api_sesion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: carritoTexto,
    })
    .then(response => response.text())
    .then(data => {
        console.log("Carrito actualizado:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
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
    alert("Carrito eliminado");



}


function tramitarPedido(){
    
    if(carritoData.length>0){

        // if(user.monedero>=totalPagar){
        //     user.monedero-=totalPagar;
            createPedido(
                carritoData
            ).then(json => {

                console.log(json);
                alert("¡Pedido tramitado con éxito!");
                
            })
            .catch(error => {
                console.error("Error al crear el pedido:", error);
            });
            
            modalFinalizarcompra= document.getElementsByClassName("finalizar-compra-container")[0]
            if(modalFinalizarcompra){
                modalFinalizarcompra.style.display = "none";
            }
        // }else{
        //     alert("No tienes suficiente crédito para completar la compra. Añade crédito primero.");

        // }
  
    }else{
        alert("El carrito está vacío");
    }



}




