//Funcion para obtener los kebabs
async function getKebabs(){
  
    const response = await fetch('/Api/Api_kebab.php',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  console.log(data);
  return data;

}



//Funcion para obtener los kebabs
async function getKebabsId(kebab){
  
    const response = await fetch('/Api/Api_kebab.php?id='+kebab.id,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  console.log(data);
  return data;
  
}