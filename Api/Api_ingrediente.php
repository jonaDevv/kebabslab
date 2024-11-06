<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");

use Models\Ingrediente;
use Repository\repoIngrediente;

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lógica para manejar GET (obtener uno o varios ingredientes)
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            $ingrediente = repoIngrediente::read($id); // Método para obtener un ingrediente por ID
        } else {
            // Obtener todos los ingredientes
            $ingredientes = repoIngrediente::getAll(); // Método para obtener todos los ingredientes
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo

        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data['nombre']) && 
            isset($data['foto']) && 
            isset($data['precio']) && 
            isset($data['estado']) && 
            isset($data['alergenos']) // Asegúrate de que este campo esté presente
        ) {
            // Crear el objeto Ingrediente
            $ingrediente = new Ingrediente(
                null,  // ID se generará automáticamente
                $data['nombre'],
                $data['foto'],
                $data['precio'],
                $data['estado'],
                $data['alergenos'] // Debes asegurarte que este sea un array de IDs de alérgenos
            );

            // Intentar crear el ingrediente
            if (repoIngrediente::create($ingrediente)) {
                http_response_code(201); // Ingrediente creado
                echo json_encode(["message" => "Ingrediente creado con éxito"]);
            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["message" => "Error al crear el ingrediente"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de ingrediente inválidos"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo

        // Verificar si se recibió el ID
        if (isset($data['id'])) {
            $id = $data['id']; // ID del ingrediente a actualizar

            // Crear un nuevo objeto ingrediente con los datos proporcionados
            $ingrediente = new Ingrediente(
                $data['id'],  // ID del ingrediente
                $data['nombre'] ?? null,
                $data['foto'] ?? null,
                $data['precio'] ?? null,
                $data['estado'] ?? null,
                $data['alergenos'] ?? [] // Array de IDs de alérgenos, si existe
            );

            header("Content-Type: application/json");
            // Llamar al método de actualización del repositorio
            if (repoIngrediente::update($id, $ingrediente)) {
                http_response_code(200); // OK
                echo json_encode(["message" => "Ingrediente actualizado correctamente"]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Ingrediente no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de ingrediente no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un ingrediente por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            header("Content-Type: application/json");
            if (repoIngrediente::delete($id)) {
                http_response_code(204); // No Content
                echo json_encode(["message" => "Ingrediente eliminado con éxito"]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Ingrediente no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "ID de ingrediente no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}
?>
