


async function getDireccionId(id){
  
    const response = await fetch('/Api/Api_direccion.php?id='+id,{
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const direccion = await response.json();


  return direccion;
  
}



async function createDireccion(direccion){
    const response = await fetch('/Api/Api_direccion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(direccion)
    });
  
    const dir = await response.json();
  
  
    return dir;
    
  }


