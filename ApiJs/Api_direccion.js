


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