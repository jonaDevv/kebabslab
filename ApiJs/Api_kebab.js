
/**
 * 
 * @returns Devuelve todos los kebab en el sistema
 */
async function getKebabs(){
  
    const response = await fetch('/Api/Api_kebab.php',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

 
  return data;

}


/**
 * 
 * @param {*} id del kebab que queremos obtener
 * @returns el kebab con el id especificado
 */
async function getKebabId(id){
  
    const response = await fetch('/Api/Api_kebab.php?id='+id,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const kebabs = await response.json();


  return kebabs;
  
}


/**
 * 
 * @param {*} id  del kebab que queremos actualizar
 * @param {*} data que es el json del kebab a actualizar
 * @returns la respuesta del servidor
 */
async function updateKebabId(id,data){
  
    const response = await fetch('/Api/Api_kebab.php?id='+id,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  const actualizarKebab = await response.json();

  return actualizarKebab;
  
}


/**
 * 
 * @param {*} id del kebab que queremos eliminar
 * @returns el kebab con el id especificado
 *  
 */
async function deleteKebabId(id){
  
    const response = await fetch('/Api/Api_kebab.php?id='+id,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const deleteKebab = await response.json();


  return deleteKebab;
  
}



