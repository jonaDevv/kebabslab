window.addEventListener('load', function () {






    cargarPedidos();






});






// script.js

// Simulando la función de fetch, para obtener los pedidos
async function cargarPedidos() {
    try {
        // Este es un ejemplo de un `fetch` para obtener pedidos de una API
        // Cambia la URL por la que corresponde en tu servidor
        const response = await fetch('/Api/Api_pedido.php');

        // Verificamos que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const pedidos = await response.json();
        if (pedidos){
            // Verificamos que la estructura de los datos sea la esperada
            if (!Array.isArray(pedidos)) {
                throw new Error('La respuesta no es un arreglo de pedidos');
            }

            pedidos.forEach(pedido => {
                const pedidoElemento = crearPedidoElemento(pedido);
               if(pedidoElemento){// Añadir el pedido a la columna correspondiente
                const columna = document.getElementById(pedido.estado);
                if (columna) {
                    columna.appendChild(pedidoElemento);
                
                }
            } 
            });

        }
    } catch (error) {
        console.error('Error al cargar los pedidos:', error);
    }
}

// Función para crear el HTML de un pedido
function crearPedidoElemento(pedido) {
    const divPedido = document.createElement('div');
    divPedido.classList.add('pedido');
    divPedido.setAttribute('data-id', pedido.id);

    const descripcion = document.createElement('p');
    descripcion.textContent = `Pedido ${pedido.id} - ${pedido.descripcion}`;

    // Crear los botones
    const botonSiguiente = document.createElement('button');
    const botonAnterior = document.createElement('button');

    // Determinar el estado siguiente y anterior
    const siguienteEstado = getEstadoSiguiente(pedido.estado);
    const anteriorEstado = getEstadoAnterior(pedido.estado);

    // Determinar los colores de los botones según el estado
    botonSiguiente.style.backgroundColor = obtenerColorEstado(siguienteEstado);
    botonAnterior.style.backgroundColor = obtenerColorEstado(anteriorEstado);

    // Asignar texto y lógica de los botones
    if (pedido.estado !== "recibidos") {
        botonAnterior.textContent = `Mover a ${anteriorEstado.charAt(0).toUpperCase() + anteriorEstado.slice(1)}`;
        botonAnterior.onclick = () => cambiarEstado(pedido.id, anteriorEstado);
        divPedido.appendChild(botonAnterior);
    }

    if (pedido.estado !== "entregados") {
        botonSiguiente.textContent = `Mover a ${siguienteEstado.charAt(0).toUpperCase() + siguienteEstado.slice(1)}`;
        botonSiguiente.onclick = () => cambiarEstado(pedido.id, siguienteEstado);
        divPedido.appendChild(botonSiguiente);
    }

    divPedido.appendChild(descripcion);

    return divPedido;
}

// Función para obtener el estado siguiente
function getEstadoSiguiente(estado) {
    const estados = ['recibido', 'preparacion', 'camino', 'entregado'];
    const siguienteEstado = estados[estados.indexOf(estado) + 1];
    return siguienteEstado ? siguienteEstado : estado;
}

// Función para obtener el estado anterior
function getEstadoAnterior(estado) {
    const estados = ['recibido', 'preparacion', 'camino', 'entregado'];
    const anteriorEstado = estados[estados.indexOf(estado) - 1];
    return anteriorEstado ? anteriorEstado : estado;
}

// Función para obtener el color correspondiente al estado
function obtenerColorEstado(estado) {
    switch (estado) {
        case 'recibido':
            return 'red';  // Rojo
        case 'preparacion':
            return 'orange';  // Naranja
        case 'camino':
            return 'yellow';  // Amarillo
        case 'entregado':
            return 'green';  // Verde
        default:
            return 'gray';  // Gris por defecto
    }
}

// Función para cambiar el estado de un pedido
function cambiarEstado(pedidoId, nuevoEstado) {
    const pedidoElemento = document.querySelector(`.pedido[data-id='${pedidoId}']`);
    const columnaDestino = document.getElementById(nuevoEstado);

    // Eliminar el pedido de la columna actual
    pedidoElemento.parentElement.removeChild(pedidoElemento);

    // Crear un nuevo pedido con los mismos datos en la nueva columna
    const pedido = {
        id: pedidoId,
        estado: nuevoEstado,
        descripcion: pedidoElemento.querySelector('p').textContent.split(' - ')[1]
    };

    const nuevoPedidoElemento = crearPedidoElemento(pedido);
    columnaDestino.appendChild(nuevoPedidoElemento);
}


