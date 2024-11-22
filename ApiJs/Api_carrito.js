



function anadirCarrito(kebab) {
    // Verifica si el kebab ya está en el carrito
    const carrito = document.getElementById("carrito");

    // Aquí puedes usar un ID o alguna propiedad única del kebab para verificar si ya existe
    if (!carrito.querySelector(`#kebab-${kebab.id}`)) {
        const kebabDiv = document.createElement('div');
        kebabDiv.classList.add('kebab-en-carrito');
        kebabDiv.id = `kebab-${kebab.id}`; // ID único para cada kebab
        kebabDiv.textContent = `${kebab.nombre} - ${kebab.precio}€`;

        // Añadir el div al carrito
        carrito.appendChild(kebabDiv);
    } else {
        console.log("Este kebab ya está en el carrito");
    }
}


function rellenarCarrito() {
    const carrito = document.getElementById("carrito");
    const modalCarrito = document.getElementById("modal-carrito");
    
    // Limpia el modal antes de añadir los kebabs
    modalCarrito.innerHTML = "<h2>Tu carrito</h2>"; // Añadimos un título al modal

    // Copiamos los kebabs del carrito a modal-carrito
    const kebabsEnCarrito = carrito.children; // Obtiene los elementos en el carrito

    Array.from(kebabsEnCarrito).forEach(kebabDiv => {
        const modalKebabDiv = document.createElement('div');
        modalKebabDiv.classList.add('kebab-en-modal');
        modalKebabDiv.textContent = kebabDiv.textContent; // Copia el contenido del kebab

        // Añadir el div del kebab al modal
        modalCarrito.appendChild(modalKebabDiv);
    });

    // Mostrar el modal
    modalCarrito.style.display = "block";
}
