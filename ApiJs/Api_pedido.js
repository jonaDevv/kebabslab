

async function createPedido(pedido){
        
    const response = await fetch('/Api/Api_pedido.php',{

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    });
    
    const pedidoRest= await response.json();
    
   
    return pedidoRest;
    
}


async function getPedidos(){
    

    const response = await fetch('/Api/Api_pedido.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const pedidos = await response.json();
    

    return pedidos;
}


async function deletPedido(id){

    console.log('Pedido cancelado:', id);

    const response = await fetch(`/Api/Api_pedido.php?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    respuesta = await response.json();

    console.log(respuesta);

   
}

async function cambiarEstado(id,estado){
   
    const response = await fetch(`/Api/Api_pedido.php?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            id:id,estado:estado
        }])
    });

   

   
}



async function cargarPedidosUser() {
    const contPedidos = document.getElementsByClassName("pedidoPuser")[0];
    
    if (!contPedidos) {
        console.error("No se encontró el contenedor 'pedidoPuser'.");
        return;
    }
    
    // Limpiar el contenedor
    contPedidos.innerHTML = "";

    getPedidos()
    .then(json => {
        if (Array.isArray(json)) {
            json.forEach(item => {
                const pedido = document.createElement("div");
                pedido.classList.add("pedidoUser");
                pedido.id = `pedido-${item.id}`;
                pedido.textContent = `Pedido ID: ${item.id} ${item.estado} ${item.precio_total}`;
                pedido.classList.add("pedidoRecibido");
                pedido.style.width="80%";

                if (item.estado === "recibido" || item.estado === "preparacion") {
                    const cancelarBtn = document.createElement("button");
                    cancelarBtn.textContent = "Cancelar";
                    cancelarBtn.classList.add("btnCancelarPedido");
                    cancelarBtn.style.backgroundColor="blue";
                    cancelarBtn.addEventListener("click", function() {
                        
                        deletPedido(item.id)
                        .then(json => {
                            console.log(json);
                            cargarPedidosUser();
                        })
                        .catch(error => {
                            console.error('Hubo un error con la solicitud fetch:', error);
                        });
                    });
                   // pedido.appendChild(cancelarBtn);
                   pedido.appendChild(cancelarBtn);
                }
                
                
   
                contPedidos.appendChild(pedido);
                
            });
        } else {
            console.error("La respuesta no es un array", json);
        }
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });




    
}
    
  