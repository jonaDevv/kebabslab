<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\LineaPedido;
use Repository\repoDireccion;
use Repository\repolineaPedido;

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
       
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            $pedido = repolineaPedido::read($id); 

        } else {
            // Obtener todos los kebabs
            $pedido = repolineaPedido::getAll(); 
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibieron todos los datos necesarios
        if (
            
            isset($data[0]['pedido_id']) && 
            isset($data[0]['cantidad']) &&
            isset($data[0]['kebabs'])&&
            isset($data[0]['precio'])
           
            
        ) {

            
            $lineaPedido = new LineaPedido(
        
                null,  // ID se generará automáticamente
                $data[0]['pedido_id'],
                $data[0]['cantidad'],
                $data[0]['kebabs'],
                $data[0]['precio']            
               

            );

           
            if (repolineaPedido::create($lineaPedido)) {
                http_response_code(201); // 
                echo json_encode(["message" => "Línea de pedido creada con éxito"]);
            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["message" => "Error al crear línea de pedido"]);
            }


            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de línea de pedido inválida"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibió el ID
        
        if (isset($data[0]['id'])) {
            $id = $data[0]['id']; // ID del usario a actualizar

            

          
           if($linea=repolineaPedido::read($id)){

                $linea->setPedido_id($data[0]['pedido_id']??$linea->getPedido_id());
                $linea->setCantidad($data[0]['cantidad']??$linea->getCantidad());
                $linea->setKebabs($data[0]['kebabs']??$linea->getKebabs());
                $linea->setPrecio($data[0]['precio']??$linea->getPrecio());      
        
            }else{

                return false;
            }



            header("Content-Type: application/json");
            // Llamar al método de actualización del repositorio
            
            if (repolineaPedido::update($id, $linea)) {
                http_response_code(200); // OK
                
            } else {
                http_response_code(404); // Not Found
               
            }


        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de linea no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un usuario por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            header("Content-Type: application/json");
            
            if (repolineaPedido::delete($id)) {

                // No Content
                echo json_encode(["message" => "Linea eliminada con éxito"]);
                http_response_code(200); 
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Linea no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de linea no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}
?>
