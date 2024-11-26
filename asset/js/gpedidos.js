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

function crearPedidoElemento(pedido) {
    const divPedido = document.createElement('div');
    divPedido.classList.add('pedido');
    divPedido.setAttribute('data-id', pedido.id);

    const descripcion = document.createElement('p');
    descripcion.textContent = `Pedido ${pedido.id} - Usuario: ${pedido.usuario_id}`;

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
    if (pedido.estado !== "recibido") {
        botonAnterior.textContent = ` ${anteriorEstado.charAt(0).toUpperCase() + anteriorEstado.slice(1)}`;
        botonAnterior.onclick = () => cambiarEstado(pedido.id, anteriorEstado);
        divPedido.appendChild(botonAnterior);
    }

    // Si el estado es "entregado", no mostrar el botón de "siguiente"
    if (pedido.estado !== "entregado") {
        botonSiguiente.textContent = `${siguienteEstado.charAt(0).toUpperCase() + siguienteEstado.slice(1)}`;
        botonSiguiente.onclick = () => cambiarEstado(pedido.id, siguienteEstado);
        divPedido.appendChild(botonSiguiente);
    }

    divPedido.appendChild(descripcion);

    return divPedido;
}


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

    // Llamar al servidor para actualizar el estado
    actualizarEstadoEnServidor(pedido);

    const nuevoPedidoElemento = crearPedidoElemento(pedido);
    columnaDestino.appendChild(nuevoPedidoElemento);
}

async function actualizarEstadoEnServidor(pedido) {
    try {
        console.log('Actualizando estado en el servidor para el pedido:', pedido); // Verifica el pedido que se envía
        const response = await fetch('/Api/Api_pedido.php', {
            method: 'PUT',  // O 'PUT' dependiendo de cómo manejes la API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)  // Enviamos el pedido con el nuevo estado
        });

        // Verificamos si la respuesta del servidor fue exitosa
        if (!response.ok) {
            throw new Error(`Error al actualizar el estado del pedido: ${response.status}`);
        }

        const respuesta = await response.json();
        console.log('Estado del pedido actualizado en el servidor:', respuesta);
        return respuesta; // Asegúrate de que el servidor esté enviando una respuesta válida

    } catch (error) {
        console.error('Error al actualizar el estado en el servidor:', error);
    }
}


