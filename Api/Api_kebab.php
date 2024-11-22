<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\Kebab; // Usar el modelo Kebab
use Repository\repoKebab; // Cambiar al repositorio de Kebabs

$method = $_SERVER['REQUEST_METHOD'];


//AÑADIR TODAS LAS VALIDACIONESS  E INICIAR SESION





switch ($method) {
    case 'GET':
        // Lógica para manejar GET (obtener uno o varios kebabs)
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            $kebab = repoKebab::read($id); // Método para obtener un kebab por ID
        } else {
            // Obtener todos los kebabs
            $kebabs = repoKebab::getAll(); // Método para obtener todos los kebabs
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        var_dump($data);
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data[0]['nombre']) && // Verificar si el campo nombre está presente
            isset($data[0]['foto']) && // Verificar si el campo foto está presente
            isset($data[0]['precio']) && // Verificar si el campo precio está presente
            isset($data[0]['ingredientes']) // Verificar si el campo ingredientes está presente
        ) {
            // Crear el objeto Kebab
            $ingredientes = [];
            foreach ($data[0]['ingredientes'] as $ingredienteId) {
                $ingredientes[] = ['id' => $ingredienteId]; // Aquí asumimos que cada ingrediente es un ID
            }

            // Crear el objeto Kebab
            $kebab = new Kebab(
                null,  // ID se generará automáticamente
                $data[0]['nombre'],
                $data[0]['foto'],
                $data[0]['precio'],
                $data[0]['ingredientes']// Lista de ingredientes
            );

            // Intentar crear el kebab
            if (repoKebab::create($kebab)) {
                http_response_code(201); // Kebab creado
                echo json_encode(["message" => "Kebab creado con éxito"]);
            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["message" => "Error al crear el kebab"]);
            }
            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de kebab inválidos"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibió el ID
        if (isset($data[0]['id'])) {
            $id = $data[0]['id']; // ID del kebab a actualizar

            // Crear un nuevo objeto kebab con los datos proporcionados
            if (isset($data[0]['ingredientes'])) {
                $ingredientes = [];
                foreach ($data[0]['ingredientes'] as $ingredienteId) {
                    $ingredientes[] = ['id' => $ingredienteId]; // Asumimos que cada ingrediente es un ID
                }
                
            }else{

                $ingredientes = [];
            }

            if($keb=repoKebab::read($id)){

           
                $keb->setNombre($data[0]['nombre']??$keb->getNombre());
                $keb->setFoto($data[0]['foto']??$keb->getFoto());
                $keb->setPrecio($data[0]['precio']??$keb->getPrecio());
                $keb->setIngredientes($ingredientes??$keb->getIngredientes());
        
            }else{
                return false;
            }



            header("Content-Type: application/json");
            // Llamar al método de actualización del repositorio
            if (repoKebab::update($id, $keb)) {
                http_response_code(200); // OK
                echo json_encode(["message" => "Kebab actualizado correctamente"]);
                echo json_encode($keb);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Kebab no encontrado"]);
            }

            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de kebab no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un kebab por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            header("Content-Type: application/json");
            
            if (repoKebab::delete($id)) {

                http_response_code(200); // No Content
                echo json_encode(["message" => "Kebab eliminado con éxito"]);
                
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Kebab no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de kebab no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}
?>
