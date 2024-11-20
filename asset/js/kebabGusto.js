window.addEventListener("load", function() {
        
        
        listaIngredientes();

        //Cogemos el boton pedir t le asignamos un evento click para añadir elementos al carrito
        
        contenedorVista = document.getElementsByClassName('vistaKebab');

       
        
        
        


        

        
       










});






async function obtenerKebab(kebab) {
    try {
        // Realizar el fetch y esperar la respuesta
        const respuesta = await fetch('Api/Api_kebab.php?nombre=' + kebab.nombre,);
        
        // Verificar si la respuesta es exitosa (HTTP status 200-299)
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status} - ${respuesta.statusText}`);
        }

        // Convertir la respuesta a JSON
        const datos = await respuesta.json();

        // Mostrar los datos obtenidos
        console.log("Datos del kebab:", datos);
        return datos; // Devolver los datos si los necesitas




    } catch (error) {
        // Manejo de errores
        console.error("Error al obtener el kebab:", error);
    }


}


