<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\Direccion;
use Repository\repoDireccion;


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            $direccion = repoDireccion::read($id); 

        } else {
            // Obtener todos los kebabs
            $direccion = repoDireccion::getAll(); 
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibieron todos los datos necesarios
        if (
            
            isset($data[0]['direccion']) &&
            isset($data[0]['usuario_id'])
           
            
        ) {

            
            $direccion= new Direccion(
        
                null,  // ID se generará automáticamente
                $data[0]['usuario_id']??null,
                $data[0]['direccion'],
                $data[0]['cordenadas']??null               
               

            );

           
            if (repoDireccion::create($direccion)) {

                http_response_code(201); // 
                echo json_encode(["message" => "Direccion creada con éxito"]);

            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["message" => "Error al crear el direccion"]);
            }


            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de direccion inválidos"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibió el ID
        if (isset($data[0]['id'])) {
            $id = $data[0]['id']; // ID del usario a actualizar

            

          
           if($dir=repoDireccion::read($id)){

           

                $dir->setDireccion($data[0]['direccion']??$dir->getDireccion());
                $dir->setCordenadas($data[0]['cordenadas']??$dir->getCordenadas());
                $dir->setUsuario_id($data[0]['usuario_id']??$dir->getUsuario_id());
                   
        
            }else{

                return false;
            }

            header("Content-Type: application/json");
            // Llamar al método de actualización del repositorio
            if (repoDireccion::update($id, $dir)) {
                http_response_code(200); // OK
                echo json_encode(["message" => "Direccion actualizada correctamente"]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Direccion no encontrada"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de direccion no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un usuario por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            header("Content-Type: application/json");
            
            if (repoDireccion::delete($id)) {

                // No Content
                echo json_encode(["message" => "Direccion eliminado con éxito"]);
                http_response_code(200); 
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Direccion no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de direccion no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}
?>
