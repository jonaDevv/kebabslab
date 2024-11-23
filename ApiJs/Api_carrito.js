



function anadirCarrito(kebab) {
    // Verifica si el kebab ya está en el carrito
    const carrito = document.getElementById("carrito");

    // Busca el kebab en el carrito usando su ID
    let kebabDiv = carrito.querySelector(`#kebab-${kebab.id}`);

    if (!kebabDiv) {
        // Si no existe, crea un nuevo elemento en el carrito
        kebabDiv = document.createElement('div');
        kebabDiv.classList.add('kebab-en-carrito');
        kebabDiv.id = `kebab-${kebab.id}`; // ID único para cada kebab

        // Incluye el nombre, precio y un contador inicial
        kebabDiv.innerHTML = `
            
            <span>${kebab.nombre}</span> - 
            <span>${kebab.precio}€</span>
            <span class="cantidad">(x1)</span>
        `;

        // Añadir el div al carrito
        carrito.appendChild(kebabDiv);

        console.log(`Añadido: ${kebab.nombre}`);
    } else {


        // Si ya existe, incrementa la cantidad
        const cantidadSpan = kebabDiv.querySelector('.cantidad');
        const cantidadActual = parseInt(cantidadSpan.textContent.replace(/\D/g, '')) || 1; // Extraer el número
        cantidadSpan.textContent = `(x${cantidadActual + 1})`;
        console.log(`Incrementada cantidad de: ${kebab.nombre}`);
    }



    // Actualizar el contador total de items en el carrito
    const count = document.getElementsByClassName("carrito-count")[0];
    count.innerHTML = (parseInt(count.innerHTML) || 0) + 1;
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

    console.log("Carrito rellenado en el modal.");
}


function vaciarCarrito() {
    // Vacia el carrito

    const carrito = document.getElementById("carrito");
    carrito.removeChield()


}
