

/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns true | false
 */
function validarLogin(username, password) {
    
    const usernameV = username.value;
    const passwordV = password.value;

    const test = [];
    const errores = []; // Array para almacenar los mensajes de error

    // Validaciones
    // const isUsernameEmpty = validarCampoVacio(usernameV);
    // const isPasswordEmpty = validarCampoVacio(passwordV);
    const userValidation = validateUser(usernameV, passwordV);

    // test.push(isUsernameEmpty); // Valida si el nombre de usuario está vacío
    // if (!isUsernameEmpty) {
    //     errores.push("El campo de usuario no puede estar vacío.");
    // }

    // test.push(isPasswordEmpty); // Valida si la contraseña está vacía
    // if (!isPasswordEmpty) {
    //    // errores.push("El campo de contraseña no puede estar vacío.");
    // }

    // Valida el contenido del nombre de usuario y la contraseña
    test.push(userValidation.isValid);
    if (!userValidation.isValid) {
        if (userValidation.errors.username) {
            errores.push(userValidation.errors.username);
        }
        if (userValidation.errors.password) {
            errores.push(userValidation.errors.password);
        }
    }

    // Si algún elemento del array `test` es `false`, muestra errores y retorna `false`
    if (test.includes(false)) {
        mostrarErrores(errores); // Mostrar errores en el DOM
        return false;
    }

    // Si todo pasa, retorna `true`

    return true;
}




/**
 *  Función para mostrar los errores en el DOM
 * @param {*} errores 
 * @returns
 * 
 * 
 */
function mostrarErrores(errores) {
    const erroresDiv = document.getElementById("errores");
    erroresDiv.innerHTML = ""; // Limpiar errores previos

    errores.forEach((error) => {
        const errorElemento = document.createElement("p");
        errorElemento.textContent = error;
        errorElemento.style.color = "red"; // Estilo del texto
        erroresDiv.appendChild(errorElemento);
    });
}

/**
 * 
 * @param {*} campo 
 * @returns true | false
 */
function validarCampoVacio(campo) {
    return campo.trim() !== "";
}



// /***
//  * Validar el campo de usuario y contraseña
//  * @param {string} username
//  * @param {string} password
//  * @returns {true | false}
//  */
// function validarCampoVacio(campo){

//     if (campo.value.length == 0){
//         campo.style.borderColor = "red";
//         campo.style.borderWidth = "2px";

//         campo.parentNode.createTextNode("Campo requerido");
//         return false;
//     }

//     return true;
// }


/***
 * Validar el campo de usuario y contraseña
 * @param {string} username 
 * @param {string} password 
 * @returns {object}
 * 
 */
function validateUser(username, password) {
    const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
    const passwordRegex = /^[A-Z][A-Za-z0-9]+[.!?@#$%^&*()_+=[\]{}|;:'",.<>?/-]$/;


    const errors = {
        username: null,
        password: null
    };

    // Validar nombre de usuario
    if (!usernameRegex.test(username)) {
        errors.username = "El nombre de usuario debe tener al menos 8 caracteres y solo puede contener letras y números.";
    }else{


        // Validar contraseña
        if (!passwordRegex.test(password)) {
            errors.password = "La contraseña debe comenzar con una letra mayúscula, seguida de caracteres alfanuméricos, y debe terminar con un punto (.) o un signo de puntuación especial.";
        }

    }

    
    return {
        isValid: !errors.username && !errors.password,
        errors
    };
}

















