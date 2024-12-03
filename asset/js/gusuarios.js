window.addEventListener("load", function() {
        

    cargarUsuarios();


    

   

});



async function cargarUsuarios() {
    try {
        const usuarios = await getUsuarios(); // Llamar a getUsuarios para obtener la lista de usuarios

        const listaUsuarios = document.getElementById('usuarios-lista');
        listaUsuarios.innerHTML = '';  // Limpiar cualquier contenido previo

        // Iterar sobre los usuarios y mostrarlos en el contenedor
        usuarios.forEach(usuario => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('usuario-item');
            usuarioDiv.innerHTML = `
                <h3>${usuario.nombre}</h3>
                <p><strong>Email:</strong> ${usuario.correo}</p>
                <p><strong>Rol:</strong> ${usuario.rol || 'No disponible'}</p>
                <p><strong>Dirección:</strong> ${usuario.direccion || 'No disponible'}</p>
                
                <!-- Botones de acción -->
                <button class="btn-cambiar-rol" data-id="${usuario.id}">Cambiar Rol</button>
                <button class="btn-eliminar" data-id="${usuario.id}">Eliminar</button>
            `;

            // Agregar cada usuario al contenedor de la lista
            listaUsuarios.appendChild(usuarioDiv);

            // Agregar el evento de eliminar
            const eliminarBtn = usuarioDiv.querySelector('.btn-eliminar');
            eliminarBtn.addEventListener('click', function() {
                eliminarUsuario(usuario.id); // Llamar a la función para eliminar el usuario
            });

            // Agregar el evento para cambiar el rol
            const cambiarRolBtn = usuarioDiv.querySelector('.btn-cambiar-rol');
            cambiarRolBtn.addEventListener('click', function() {
                cambiarRolUsuario(usuario.id, usuario.rol); // Llamar a la función para cambiar el rol
            });
        });
    } catch (error) {
        console.error('Error cargando los usuarios:', error);
    }
}

// Función para cargar los usuarios y agregar los botones de cambiar rol y eliminar
async function cargarUsuarios() {
    try {
        const usuarios = await getUsuarios(); // Llamar a getUsuarios para obtener la lista de usuarios

        const listaUsuarios = document.getElementById('usuarios-lista');
        listaUsuarios.innerHTML = '';  // Limpiar cualquier contenido previo

        // Iterar sobre los usuarios y mostrarlos en el contenedor
        usuarios.forEach(usuario => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('usuario-item');
            usuarioDiv.innerHTML = `
                <h3>${usuario.nombre}</h3>
                <p><strong>Email:</strong> ${usuario.correo}</p>
                <p><strong>Rol:</strong> ${usuario.rol || 'No disponible'}</p>
               
            `;

            // Crear un selector para cambiar el rol
            const selectRoles = document.createElement('select');
            selectRoles.id = `selectRol${usuario.id}`;
            selectRoles.innerHTML = `
                <option value="usuario" ${usuario.rol === 'usuario' ? 'selected' : ''}>Usuario</option>
                <option value="administrador" ${usuario.rol === 'administrador' ? 'selected' : ''}>Administrador</option>
            `;
            usuarioDiv.appendChild(selectRoles);

            // Crear un botón para confirmar el cambio de rol
            const buttonCambiarRol = document.createElement('button');
            buttonCambiarRol.textContent = 'Cambiar Rol';
            buttonCambiarRol.addEventListener('click', async () => {
                const nuevoRol = selectRoles.value;
                await cambiarRolUsuario(usuario.id, nuevoRol);
                window.location.reload();
            });
            usuarioDiv.appendChild(buttonCambiarRol);

            // Crear un botón para eliminar al usuario
            const buttonEliminar = document.createElement('button');
            buttonEliminar.textContent = 'Eliminar Usuario';
            buttonEliminar.addEventListener('click', async () => {
                const confirmDelete = confirm("¿Estás seguro de que deseas eliminar a este usuario?");
                if (confirmDelete) {
                    await eliminarUsuario(usuario.id);
                }
                window.location.reload();
            });
            usuarioDiv.appendChild(buttonEliminar);

            // Agregar cada usuario al contenedor de la lista
            listaUsuarios.appendChild(usuarioDiv);
        });
    } catch (error) {
        console.error('Error cargando los usuarios:', error);
    }
}

// Función para cambiar el rol de un usuario
async function cambiarRolUsuario(id, rolNuevo) {
    try {
        const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
            method: 'PUT', // Usamos PUT para la actualización
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ id: id,rol: rolNuevo }]) // Enviamos el nuevo rol al servidor
        });

        const data = await response.json();
        if (data.success) {
            alert("Rol actualizado correctamente.");
            cargarUsuarios(); // Recargar la lista de usuarios
        } else {
            alert("Error al actualizar el rol.");
        }
    } catch (error) {
        console.error('Error cambiando el rol del usuario:', error);
    }
}

// Función para eliminar un usuario
async function eliminarUsuario(id) {
    try {
        const response = await fetch(`/Api/Api_usuario.php?id=${id}`, {
            method: 'DELETE', // Usamos DELETE para eliminar
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.success) {
            alert("Usuario eliminado correctamente.");
            cargarUsuarios(); // Recargar la lista de usuarios
        } else {
            alert("Error al eliminar el usuario.");
        }
    } catch (error) {
        console.error('Error eliminando el usuario:', error);
    }
}
