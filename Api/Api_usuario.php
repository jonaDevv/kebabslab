<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\Usuario;
use Repository\repoUsuario;


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lógica para manejar GET (obtener uno o varios usuario)
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            $usuario = repoUsuario::read($id); // Método para obtener un kebab por ID

        } else {
            // Obtener todos los kebabs
            $usuario = repoUsuario::getAll(); // Método para obtener todos los kebabs
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data[0]['nombre']) && // Verificar si el campo nombre está presente
            isset($data[0]['password']) &&
            isset($data[0]['rol']) &&
            isset($data[0]['correo']) 
           
            
        ) {

            
            $usuario= new Usuario(
        
                null,  // ID se generará automáticamente
                $data[0]['nombre'],
                $data[0]['password'],
                $data[0]['rol'],
                $data[0]['correo'],
                $data[0]['monedero']??0.0, 
                $data[0]['foto']??null,
                $data[0]['carrito']??null,
                $data[0]['alergia']??$data[0]['alergia']=[],
                $data[0]['direccion']??$data[0]['direccion']=[]
                
               

            );

            // Intentar crear el kebab
            if (repoUsuario::create($usuario)) {
                http_response_code(201); // Usuario creado
                echo json_encode(["message" => "Usuario creado con éxito"]);
            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["message" => "Error al crear el usuario"]);
            }


            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de usuario inválidos"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibió el ID
        if (isset($data[0]['id'])) {
            $id = $data[0]['id']; // ID del usario a actualizar

            // Actualizar un objeto usuario con los datos proporcionados
            if (isset($data[0]['direccion'])) {
                $direccion = [];
                foreach ($data[0]['direccion'] as $direccionId) {
                    $direccion[] = ['id' => $direccionId]; 
                }
            }else{

                $direccion = [];
            }

            

           // Crear el objeto usuario
           if($user=repoUsuario::read($id)){

           

                $user->setNombre($data[0]['nombre']??$user->getNombre());
                $user->setPassword($data[0]['password']??$user->getPassword());
                $user->setRol($data[0]['rol']??$user->getRol());
                $user->setCorreo($data[0]['correo']??$user->getCorreo());
                $user->setMonedero($data[0]['monedero']??$user->getMonedero());
                $user->setFoto($data[0]['foto']??$user->getFoto());
                $user->setCarrito($data[0]['carrito']??$user->getCarrito());
                $user->setAlergia($data[0]['alergia']??$user->getAlergia());
                $user->setDireccion($direccion??$user->getDireccion());
                
        
            }else{
                return false;
            }

            header("Content-Type: application/json");
            // Llamar al método de actualización del repositorio
            if (repoUsuario::update($id, $user)) {
                http_response_code(200); // OK
                echo json_encode(["message" => "Usuario actualizado correctamente"]);
                echo json_encode($user);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Usuario no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de usuario no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un usuario por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            header("Content-Type: application/json");
            
            if (repoUsuario::delete($id)) {

                // No Content
                echo json_encode(["message" => "Usuario eliminado con éxito"]);
                http_response_code(200); 
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Usuario no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de usuario no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}
?>
