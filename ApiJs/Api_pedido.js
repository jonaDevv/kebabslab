

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

    const user=await getUsuario(JSON.parse(localStorage.getItem('User')).id);
    
    if (contPedidos) {
       
        contPedidos.innerHTML = "";
       
    }
    
   

    getPedidos()
    .then(json => {
        if (Array.isArray(json)) {
            json.forEach(item => {
                const pedido = document.createElement("div");
                pedido.textContent = `Pedido ID: ${item.id}
                 
                Estado:${item.estado} ${item.precio_total} €
                                                            Dirección: ${item.direccion}`;
                pedido.classList.add("pedidoRecibido");
                pedido.style.width="80%";

                if (item.estado === "recibido" || item.estado === "preparacion") {
                    const cancelarBtn = document.createElement("button");
                    cancelarBtn.textContent = "Cancelar";
                    cancelarBtn.classList.add("btnCancelarPedido");
                    cancelarBtn.style.backgroundColor="blue";
                    cancelarBtn.addEventListener("click", function() {
                        
                        const newMonedero=parseFloat(user.monedero)+parseFloat(item.precio_total);
                        actualizarMonedero(item.usuario_id,newMonedero)
                        deletPedido(item.id)
                        .then(json => {

                            console.log(json);
                            cargarPedidosUser();
                            mostrarPerfil(item.usuario_id);

                        })
                        .catch(error => {
                            console.error('Hubo un error con la solicitud fetch:', error);
                        });
                    });

                    
                   // pedido.appendChild(cancelarBtn);
                   if(pedido){
                   pedido.appendChild(cancelarBtn);
                    }

                }else if(item.estado === "entregado"){

                    pedido.style.backgroundColor="green";
                    


                }
                
                pedido.addEventListener("click", function() {
                    
                    alert("Pedido " + pedido.id );
                    
                });
                
                if (contPedidos) {
                contPedidos.appendChild(pedido);
                }
            });
        } else {
            console.error("La respuesta no es un array", json);
        }
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });




    
}


async function enviarCorreo(cuerpo, destinatario) {
    // Definir los datos a enviar a la API
    const datosCorreo = {
        cuerpo: cuerpo, // El cuerpo del correo
        destinatario: destinatario // Dirección del destinatario
    };

    try {
        // Enviar la solicitud POST a la API
        const respuesta = await fetch('../Email/email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosCorreo) // Convertir los datos a JSON
        });

        // Convertir la respuesta a JSON
        const resultado = await respuesta.json();
        console.log('Respuesta del servidor:', resultado);

        if (respuesta.ok) {
            console.log('Correo enviado correctamente');
        } else {
            console.error('Error en el envío del correo:', resultado.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

