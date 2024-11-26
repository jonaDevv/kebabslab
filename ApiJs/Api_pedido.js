

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
    
  