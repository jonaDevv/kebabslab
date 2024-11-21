






/**
 * 
 * @returns Devuelve todos los ingredientesen el sistema
 */
async function getIngredientes() {
  try {
      const response = await fetch('/Api/Api_ingrediente.php', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          // Si la respuesta no es 2xx, lanza un error
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const ingredientes = await response.json();
      return ingredientes;
  } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      throw error; // Propaga el error para manejarlo fuera de la función
  }
}


/**
 * 
 * @param {*} id del ingrediente que queremos obtener
 * @returns el ingrediente con el id especificado
 */
async function getIngredienteId(id){
  
    const response = await fetch('/Api/Api_ingrediente.php?id='+id,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const ingrediente = await response.json();


  return ingrediente;
  
}


/**
 * 
 * @param {*} id  del ingrediente que queremos actualizar
 * @param {*} data que es el json del ingrediente a actualizar
 * @returns la respuesta del servidor
 */
async function updateIngredienteId(id,data){
  
    const response = await fetch('/Api/Api_ingrediente.php?id='+id,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  const actualiarIngrediente = await response.json();

  return actualizarIngrediente;
  
}


/**
 * 
 * @param {*} id del ingrediente que queremos eliminar
 * @returns el kebab con el id especificado
 *  
 */
async function deleteingredienteId(id){
  
    const response = await fetch('/Api/Api_ingrediente.php?id='+id,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const deleteIngrediente = await response.json();


  return deleteIngrediente;
  
}



