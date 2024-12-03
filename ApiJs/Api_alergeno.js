/**
 * 
 * @returns Devuelve todos los ingredientesen el sistema
 */
async function getAlergenos() {
  try {
      const response = await fetch('/Api/Api_alergeno.php', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          // Si la respuesta no es 2xx, lanza un error
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const alergenos = await response.json();
      return alergenos;
  } catch (error) {
      console.error('Error al obtener los alergenos:', error);
      throw error; // Propaga el error para manejarlo fuera de la función
  }
}


/**
 * 
 * @param {*} id del ingrediente que queremos obtener
 * @returns el ingrediente con el id especificado
 */
async function getAlergenoId(id){
  
    const response = await fetch('/Api/Api_alergeno.php?id='+id,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const alergeno = await response.json();


  return alergeno;
  
}


/**
 * 
 * @param {*} id  del ingrediente que queremos actualizar
 * @param {*} data que es el json del ingrediente a actualizar
 * @returns la respuesta del servidor
 */
async function updateAlergenoId(id,data){
  
    const response = await fetch('/Api/Api_alergeno.php?id='+id,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  const actualizarAlergeno = await response.json();

  return actualizarAlergeno;
  
}


/**
 * 
 * @param {*} id del ingrediente que queremos eliminar
 * @returns el kebab con el id especificado
 *  
 */
async function deleteAlergenoId(id){
  
    const response = await fetch('/Api/Api_alergeno.php?id='+id,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const deleteAlergeno = await response.json();


  return deleteAlergeno;
  
}



