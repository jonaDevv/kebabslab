




async function checkSession() {

    const response = await fetch('/Api/Api_sesion.php');
    
      const sesion = await response.json();
    
    
      return sesion.user;
}

async function getUsuario(id){
    
    const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
         // Solo envías el saldo en el cuerpo
    });

    const usuario = await response.json()
    return usuario;
}





async function mostrarPerfil(id) {

    perfil= await getUsuario(id);
    // Suponiendo que el objeto perfil tiene campos como nombre, correo y foto
    const nombre = document.getElementById('nombrePerfil');
    const correo = document.getElementById('correoPerfil');
    const fotoPerfil = document.getElementById('fotoPerfilImg');
    const monedero = document.getElementsByClassName('saldoPerfil')[0];
   
    
    await fetch(`/Api/Api_pedido.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(respuesta => respuesta.json())  // Convierte la respuesta a JSON
    .then(json => {
        if (json && Array.isArray(json)) { // Asegurarte de que la respuesta sea un array
            json.forEach(pedido => {
                if (pedido.estado === "recibido" || pedido.estado === "preparacion") {
                    const pedidos = document.getElementsByClassName('pedidoPuser')[0];
                    
                    if (pedidos) {
                        // Crear el botón de forma programática
                        const boton = document.createElement('button');
                        boton.textContent = 'Cancelar'; // Texto del botón
                        boton.setAttribute('data-id', pedido.id); // Usar un atributo de datos para almacenar el id

                        // Asocia el evento con la función `deletPedido`
                        boton.addEventListener('click', function () {
                            deletPedido(pedido.id); // Llama a la función y pasa el `id` desde el objeto pedido
                        });

                        // Agregar el contenido del pedido al contenedor
                        pedidos.innerHTML += `Pedido: ${pedido.id} <br> Estado: ${pedido.estado} Total: ${pedido.precio_total}€<br>`;
                        
                        // Añadir el botón al contenedor
                        pedidos.appendChild(boton); // Agrega el botón después del texto

                        // Asegurarse de que el contenedor esté visible
                        pedidos.style.display = "block";
                    } else {
                        console.error('Contenedor no encontrado');
                    }
                }
            });
        } else {
            console.error('La respuesta JSON no contiene un array o está vacía');
        }
    })
    
    .catch(error => {
        console.error("Error al hacer la solicitud:", error);
    });

    // Asignamos los valores obtenidos del perfil a los elementos del DOM
    if (nombre) {
        nombre. innerHTML = perfil.nombre || '';
    }

    if (correo) {
        correo.innerHTML = perfil.correo || '';
    }

    if (fotoPerfil) {
        fotoPerfil.src = perfil.foto || 'default-foto.jpg'; // Si no tiene foto, se carga una predeterminada
    }
    
   if (perfil.direccion && perfil.direccion.length > 0) {
    const contenedorDirecciones = document.getElementById('direccionPerfil'); // Contenedor en tu HTML

    // Limpia el contenedor antes de agregar las direcciones (opcional)
        if(contenedorDirecciones){
            contenedorDirecciones.innerHTML = '';
        }
    // Itera sobre el array de direcciones
        perfil.direccion.forEach((direccion, index) => {
            // Crear un elemento para mostrar la dirección (puede ser un input, p, li, etc.)
            const elementoDireccion = document.createElement('p');
            elementoDireccion.innerHTML = `Dirección ${index + 1}:<br>${direccion.direccion}`;

        
            elementoDireccion.className = 'direccion-item'; // Clase para estilos si es necesario
            elementoDireccion.dir=direccion

            if(contenedorDirecciones){
                // Agrega el elemento al contenedor
                contenedorDirecciones.appendChild(elementoDireccion);
            }
            
        });
    } else {
        console.log('No hay direcciones disponibles.');
    }
    creditActual=document.getElementById("credito-actual-credito")
    if(creditActual){
        creditActual.textContent=perfil.monedero;
    }
    

    saldom=document.getElementById("saldoM")
    if(saldom){
        saldom.innerHTML=perfil.monedero;
        saldom.value=perfil.monedero;
    }
    
    
    if (monedero) {
        monedero.innerHTML= " "+perfil.monedero + "€" || '';
    }

    // Si deseas agregar más campos, como direcciones o pedidos, puedes hacerlo aquí
    // ejemplo: mostrar direcciones, pedidos, etc.
}



async function actualizarMonedero(id, saldo) {

    try {
        // Log de los datos enviados
        console.log("Enviando datos:", JSON.stringify({id:id,monedero:saldo}));

        const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{id:id,monedero:saldo}]), // Solo envías el saldo en el cuerpo
        });

        // Validar la respuesta del servidor
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Procesar la respuesta
        const credit = await response.json();
        return credit;

    } catch (error) {
        console.error("Error al actualizar el monedero:", error.message);
        return null; // Devolver null si hay un error
    }
}

function agregarDireccion(){
  
}

function editarFicha(perfil) {
    let nombre = document.getElementById('nombrePerfil');
    let correo = document.getElementById('correoPerfil');
    let editarbtn = document.getElementById('editarPerfil');
    let guardarbtn = document.createElement('button');
    editarbtn.parentNode.appendChild(guardarbtn);
    guardarbtn.textContent = 'Guardar';
    guardarbtn.addEventListener('click', function () {
        let nombreInput = document.getElementById('nombreInput');
        let correoInput = document.getElementById('correoInput');
        perfil.nombre = nombreInput.value;
        perfil.correo = correoInput.value;
        console.log(perfil);
        mostrarPerfil(perfil);
    });
    
    if (nombre && correo) {
        // Convertir el nombre y el correo en campos de texto
        nombre.innerHTML = `<input type="text" id="nombreInput" value="${perfil.nombre.toUpperCase()}" />`;
        correo.innerHTML = `<input type="text" id="correoInput" value="${perfil.correo}" />`;
    }
}
