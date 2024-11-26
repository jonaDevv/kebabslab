<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\Pedido;
use Repository\repoPedido;
use Helper\Sesion;

Sesion::iniciaSesion();

$rol = $_SESSION['user']['rol'];

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            
            $pedido = repoPedido::read($id); 
            
        } else {

            if ($rol == "usuario") {
                // Obtener todos los pedidos del usuario
                $pedido = repoPedido::getAllId($id); 
                
            } else {

                if ($rol == "administrador") {
                    // Obtener todos los pedidos del usuario
                    $pedido = repoPedido::getAll(); 

                }else{

                    http_response_code(301); // Not Found
                    ;
                }
                 
            }
            
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibieron todos los datos necesarios
        
        if (
            isset($data[0]['usuario_id']) && 
            isset($data[0]['lineasPedido']) &&
            isset($data[0]['precio_total'])
            
           
            
        ) {

            
            $pedido= new Pedido(
        
                null,  // ID se generará automáticamente
                $data[0]['usuario_id'],
                $data[0]['fecha_hora']??"",
                $data[0]['estado']??"recibido",
                $data[0]['precio_total']??0.0,
                $data[0]['direccion']??$data[0]['direccion']=[],
                $data[0]['coordenada']??$data[0]['coordenada']="",
                $data[0]['lineasPedido']??$data[0]['lineasPedido']=[]
                
               

            );

           
            if (repoPedido::create($pedido)) {
                http_response_code(201); // 
                echo json_encode(["message" => "Pedido creado con éxito"]);
            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["message" => "Error al crear el pedido"]);
            }


            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de pedido inválidos"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibió el ID
        if (isset($data[0]['id'])) {
            $id = $data[0]['id']; // ID del usario a actualizar

            

           // Crear el objeto usuario
           if($ped=repoPedido::read($id)){

           

                $ped->setUsuario_id($data[0]['usuario_id']??$ped->getUsuario_id());
                $ped->setFecha_hora($data[0]['fecha_hora']??$ped->getFecha_hora());
                $ped->setLineasPedido($data[0]['lineasPedido']??$ped->getLineasPedido());
                $ped->setEstado($data[0]['estado']??$ped->getEstado());
                $ped->setPrecio_total($data[0]['precio_total']??$ped->getPrecio_total());
                $ped->setCoordenada($data[0]['coordenada']??$ped->getCoordenada());
                $ped->setDireccion($lineasPedido??$ped->getDireccion());

                
        
            }else{
                return false;
            }

            header("Content-Type: application/json");
            // Llamar al método de actualización del repositorio
            if (repoPedido::update($id, $ped)) {
                http_response_code(200); // OK
                echo json_encode(["message" => "Pedido actualizado correctamente"]);
                echo json_encode($ped);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Pedido no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de pedido no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un usuario por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            header("Content-Type: application/json");
            
            if (repoPedido::delete($id)) {

                // No Content
                echo json_encode(["message" => "Pedido eliminado con éxito"]);
                http_response_code(200); 
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Pedido no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de pedido no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}
?>
