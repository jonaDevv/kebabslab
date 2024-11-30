window.addEventListener('load', function () {




    cargarContenedoresPedido();
   setInterval(cargarContenedoresPedido,20000);


   
   setInterval(cargarPedidosUser,1000);
   






});


async function cargarContenedoresPedido(){

    reiniciarContenedor();

    getPedidos()
    .then(json => {
        if (Array.isArray(json)) {
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
    console.log(us);
    const recibido=document.getElementById("recibido");
    const preparacion=document.getElementById("preparacion");
    const entregado=document.getElementById("entregado");
    const camino=document.getElementById("camino");

    const siguiente=document.createElement("button");
    const anterior=document.createElement("button");

    const estadoPedido=pedido.estado;
    
    const pedidoRecibido=document.createElement("div");
    pedidoRecibido.textContent=pedido.id+"  - "+us.nombre;
    pedidoRecibido.classList.add("pedidoRecibido");
   
    
    console.log(estadoPedido);

    switch(estadoPedido){

        case "recibido":
            pedidoRecibido.style.backgroundColor="#9a2518";
           
            siguiente.classList.add("siguiente");
            siguiente.textContent="->";
            siguiente.addEventListener("click",function(){
                cambiarEstad(pedido,"siguiente");
            })
            pedidoRecibido.appendChild(siguiente);
            recibido.appendChild(pedidoRecibido);

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

            if(pedido.estado==="recibido"){
                
                cambiarEstado(pedido.id,"preparacion");
                cargarContenedoresPedido();

            }else if(pedido.estado==="preparacion"){
                
                cambiarEstado(pedido.id,"camino")
                cargarContenedoresPedido();

                
            }else if(pedido.estado==="camino"){
                
                cambiarEstado(pedido.id,"entregado")
                cargarContenedoresPedido();

               
            }
            break;

        case "anterior":
            
            if(pedido.estado==="preparacion"){
                
                cambiarEstado(pedido.id,"recibido");
                cargarContenedoresPedido();

            
            }else if(pedido.estado==="camino"){
                
                cambiarEstado(pedido.id,"preparacion");
                cargarContenedoresPedido();

                
            }else if(pedido.estado==="entregado"){
                
                cambiarEstado(pedido.id,"camino");
                cargarContenedoresPedido();
            }
            
            break;

        default:

            console.log("No se ha encontrado ninguna accion");
            break;
    }


    
   

}


function reiniciarContenedor(){
    const recibido=document.getElementById("recibido");
    const preparacion=document.getElementById("preparacion");
    const entregado=document.getElementById("entregado");
    const camino=document.getElementById("camino");
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






