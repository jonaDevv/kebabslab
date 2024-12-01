window.addEventListener('load', function () {
   
   
    cargarPedidosPerfil();
 
   
});



function cargarPedidosPerfil(){


    const contPedidosUserMS = document.getElementsByClassName("cont-misPedidos")[0];
    const PedidosUser = document.createElement("div");
    PedidosUser.classList.add("pedidoPerfil");
    

    if (contPedidosUserMS) {
        
        contPedidosUserMS.appendChild(PedidosUser);
    }
    



}