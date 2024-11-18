window.addEventListener("load", function() {
    
        
    
        fetch("/Api/Api_pedido.php",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            
            json.forEach(item => {

                const pedidosActivos = document.getElementsByClassName("pedidosActivos")[0];
                pedidosActivos.innerHTML += item.id +" "+ item.usuario_id +" "+ item.estado+" "+ item.usuario_id +"<br>";
                console.log(item);





            });
        })
        .catch(error => console.log(error));    

        
       










});