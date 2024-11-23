// Array global para gestionar el carrito
let carritoData = [];

function anadirCarrito(kebab) {
    // Buscar si ya existe una línea de pedido con el mismo kebab ID
    let itemExistente = carritoData.find(item => {
        return item.lineasPedido.some(linea => linea.kebabs.some(kebabItem => kebabItem.id === kebab.id));
    });

    if (itemExistente) {
        // Si ya existe, buscar la línea de pedido que contiene ese kebab por ID
        let lineaExistente = itemExistente.lineasPedido.find(linea => linea.kebabs.some(kebabItem => kebabItem.id === kebab.id));

        // Añadir el kebab dentro de la línea de pedido, incluso si tiene un precio diferente
        lineaExistente.kebabs.push({
            id: kebab.id,
            kebab: kebab.nombre,
            ingredientes: kebab.ingredientes,
            precio: kebab.precio
        });

        // Actualizar el precio total de la línea de pedido
        lineaExistente.precioTotal = calcularPrecioTotal(lineaExistente);
        console.log(`Añadido kebab con ID ${kebab.id} a la línea de pedido existente.`);
    } else {
        // Si no existe, crear una nueva línea de pedido con el kebab
        carritoData.push({
            lineasPedido: [
                {
                    id: carritoData.length + 1, // ID de la línea de pedido
                    kebabs: [{
                        id: kebab.id,
                        kebab: kebab.nombre,
                        ingredientes: kebab.ingredientes,
                        precio: kebab.precio
                    }],
                    precioTotal: kebab.precio,  // El precio total de la línea es el precio del primer kebab
                    pedido_id: 10  // ID del pedido
                }
            ]
        });
        console.log(`Añadido kebab con ID ${kebab.id} como nueva línea de pedido.`);
    }

    // Actualizar la vista del carrito en el DOM
    actualizarCarritoUI();
    console.log(carritoData);
}

// Función para calcular el precio total de una línea de pedido (sumando el precio de todos los kebabs dentro)
function calcularPrecioTotal(linea) {
    return linea.kebabs.reduce((total, kebab) => total + kebab.precio, 0);
}

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



function meterCarritoUser(carrito) {
    
    let carritoTexto = JSON.stringify(carrito);

    // Enviar mediante fetch o un formulario
    fetch("Api/Api_sesion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: carritoTexto,
    })
        .then((response) => response.text())
        .then((data) => {
            console.log("Carrito actualizado:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}



