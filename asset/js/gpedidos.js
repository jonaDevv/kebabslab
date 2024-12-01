window.addEventListener('load', function () {




    cargarContenedoresPedido();
    setInterval(cargarContenedoresPedido,20000);


   cargarPedidosUser();
   setInterval(cargarPedidosUser,5000);
   






});


async function cargarContenedoresPedido(){

    reiniciarContenedor();

    getPedidos()
    .then(json => {
        if (Array.isArray(json) ) {
            json.forEach(item => {
                repartirPedidos(item);
            });
        } else {
            console.error("La respuesta no es un array", json);
        }
    })
    .catch(error => {
        console.error('Hubo un error con la solicitud fetch:', error);
    });


}


async function repartirPedidos(pedido){
    const us = await getUsuario(pedido.usuario_id);
    
    const recibido=document.getElementsByClassName("pedidos-recibido")[0];
    const preparacion=document.getElementsByClassName("pedidos-preparacion")[0];
    const entregado=document.getElementsByClassName("pedidos-entregado")[0];
    const camino=document.getElementsByClassName("pedidos-camino")[0];

   
    const siguiente=document.createElement("button");
    const anterior=document.createElement("button");

    const estadoPedido=pedido.estado;
    
    const pedidoRecibido=document.createElement("div");
    pedidoRecibido.textContent=pedido.id+"  - "+us.nombre;
    pedidoRecibido.classList.add("pedidoRecibido");
   
    
    

    switch(estadoPedido){

        case "recibido":
            pedidoRecibido.style.backgroundColor="#9a2518";
           
            siguiente.classList.add("siguiente");
            siguiente.textContent="->";
            siguiente.addEventListener("click",function(){
                cambiarEstad(pedido,"siguiente");
            })
            if(siguiente){
            pedidoRecibido.appendChild(siguiente);
            }
            if(recibido){
            recibido.appendChild(pedidoRecibido);
            }
            break;
        case "preparacion":
            pedidoRecibido.style.backgroundColor="#f39c12";
            anterior.classList.add("anterior");
            anterior.textContent="<-";
            anterior.addEventListener("click",function(){
                cambiarEstad(pedido,"anterior");
            })
            pedidoRecibido.appendChild(anterior);
            siguiente.classList.add("siguiente");
            siguiente.textContent="->";
            siguiente.addEventListener("click",function(){
                cambiarEstad(pedido,"siguiente");
            })
            pedidoRecibido.appendChild(siguiente);

            preparacion.appendChild(pedidoRecibido);
            break;

        case "entregado":
            pedidoRecibido.style.backgroundColor="#2658b7";
            anterior.classList.add("anterior");
            anterior.textContent="<-";
            anterior.addEventListener("click",function(){
                cambiarEstad(pedido,"anterior");
            })
            pedidoRecibido.appendChild(anterior);
           
            entregado.appendChild(pedidoRecibido);
            break;

        case "camino":
            pedidoRecibido.style.backgroundColor="#1a8a32";
            anterior.classList.add("anterior");
            anterior.textContent="<-";
            anterior.addEventListener("click",function(){
                cambiarEstad(pedido,"anterior");
            })
            pedidoRecibido.appendChild(anterior);
            siguiente.classList.add("siguiente");
            siguiente.textContent="->";
            siguiente.addEventListener("click",function(){
                cambiarEstad(pedido,"siguiente");
            })
            pedidoRecibido.appendChild(siguiente);
            camino.appendChild(pedidoRecibido);
            break;

        default:
            break;
    }
     
}



function cambiarEstad(pedido,direccion){

   //Evaluamos el estado del pedido y la direccion para saber a donde es necesario cambiar

    switch(direccion){
        case "siguiente":

            // if(pedido.estado==="recibido"){
                
            //     cambiarEstado(pedido.id,"preparacion");
            //     cargarContenedoresPedido();

            // }else if(pedido.estado==="preparacion"){
                
            //     cambiarEstado(pedido.id,"camino")
            //     cargarContenedoresPedido();

                
            // }else if(pedido.estado==="camino"){
                
            //     cambiarEstado(pedido.id,"entregado")
            //     cargarContenedoresPedido();

               
            // }
            switch(pedido.estado){
                case "recibido":
                    cambiarEstado(pedido.id,"preparacion");
                    cargarContenedoresPedido();
                    cargarPedidosUser();
                    break;
                case "preparacion":
                    cambiarEstado(pedido.id,"camino");
                    cargarContenedoresPedido();
                    break;
                case "camino":
                    cambiarEstado(pedido.id,"entregado");
                    cargarContenedoresPedido();
                    break;
                case "entregado":
                    cambiarEstado(pedido.id,"camino");
                    cargarContenedoresPedido();
                    break;
            }
            break;

        case "anterior":
            
            // if(pedido.estado==="preparacion"){
                
            //     cambiarEstado(pedido.id,"recibido");
            //     cargarContenedoresPedido();

            
            // }else if(pedido.estado==="camino"){
                
            //     cambiarEstado(pedido.id,"preparacion");
            //     cargarContenedoresPedido();

                
            // }else if(pedido.estado==="entregado"){
                
            //     cambiarEstado(pedido.id,"camino");
            //     cargarContenedoresPedido();
            // }

            switch(pedido.estado){
                case "preparacion":
                    cambiarEstado(pedido.id,"recibido");
                    cargarContenedoresPedido();
                    break;
                case "camino":  
                    cambiarEstado(pedido.id,"preparacion");
                    cargarContenedoresPedido();
                    break;
                case "entregado":
                    cambiarEstado(pedido.id,"camino");
                    cargarContenedoresPedido();
                    break;
            }


          
            
            break;

        default:

            console.log("No se ha encontrado ninguna accion");
            break;
    }


    
   

}


function reiniciarContenedor(){
    const recibido=document.getElementsByClassName("pedidos-recibido")[0];
    const preparacion=document.getElementsByClassName("pedidos-preparacion")[0];
    const entregado=document.getElementsByClassName("pedidos-entregado")[0];
    const camino=document.getElementsByClassName("pedidos-camino")[0];

    if(recibido){    
        recibido.innerHTML="";
    }
    if(preparacion){
        preparacion.innerHTML="";
    }
    if(entregado){
        entregado.innerHTML="";
    }
    if(camino){
        camino.innerHTML="";
    }
    
}






