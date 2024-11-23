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
        // Lógica para manejar GET (obtener uno o varios usuarios)
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $id = $_GET['id'];
            $usuario = repoUsuario::read($id); // Método para obtener un usuario por ID

            if ($usuario) {
                echo json_encode(["success" => true, "user" => $usuario]);
            } else {
                echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
            }
        } else {
            // Obtener todos los usuarios
            $usuarios = repoUsuario::getAll(); // Método para obtener todos los usuarios
            echo json_encode(["success" => true, "user" => $usuarios]);
        }
        break;

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data[0]['nombre']) && // Verificar si el campo nombre está presente
            isset($data[0]['password']) &&
            isset($data[0]['correo']) 
        ) {
            // Crear un nuevo usuario
            $usuario = new Usuario(
                null,  // ID se generará automáticamente
                $data[0]['nombre'],
                $data[0]['password'],
                $data[0]['rol']??"usuario",
                $data[0]['correo'],
                $data[0]['monedero'] ?? 0.0, 
                $data[0]['foto'] ?? null,
                $data[0]['carrito'] ?? null,
                $data[0]['alergia'] ?? [],
                $direccion=[$data[0]['direccion']] ?? []
            );

            // Intentar crear el usuario
            if (repoUsuario::create($usuario)) {
                http_response_code(201); // Usuario creado
                echo json_encode(["success" => true, "message" => "Usuario creado con éxito"]);
            } else {
                http_response_code(500); // Error en la creación
                echo json_encode(["success" => false, "message" => "Error al crear el usuario"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["success" => false, "message" => "Datos de usuario inválidos"]);
        }
        break;

    case 'PUT':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibió el ID
        if (isset($data[0]['id'])) {
            $id = $data[0]['id']; // ID del usuario a actualizar

            // Crear el objeto usuario
            if ($user = repoUsuario::read($id)) {
                $user->setNombre($data[0]['nombre'] ?? $user->getNombre());
                $user->setPassword($data[0]['password'] ?? $user->getPassword());
                $user->setRol($data[0]['rol'] ?? $user->getRol());
                $user->setCorreo($data[0]['correo'] ?? $user->getCorreo());
                $user->setMonedero($data[0]['monedero'] ?? $user->getMonedero());
                $user->setFoto($data[0]['foto'] ?? $user->getFoto());
                $user->setCarrito($data[0]['carrito'] ?? $user->getCarrito());
                $user->setAlergia($data[0]['alergia'] ?? $user->getAlergia());
                $user->setDireccion($data[0]['direccion'] ?? $user->getDireccion());

                // Llamar al método de actualización del repositorio
                if (repoUsuario::update($id, $user)) {
                    http_response_code(200); // OK
                    echo json_encode(["success" => true, "message" => "Usuario actualizado correctamente"]);
                } else {
                    http_response_code(404); // Not Found
                    echo json_encode(["success" => false, "message" => "Error al actualizar el usuario"]);
                }
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["success" => false, "message" => "ID de usuario no proporcionado"]);
        }
        break;

    case 'DELETE':
        // Lógica para manejar DELETE (eliminar un usuario por ID)
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            if (repoUsuario::delete($id)) {
                http_response_code(200); // OK
                echo json_encode(["success" => true, "message" => "Usuario eliminado con éxito"]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["success" => false, "message" => "ID de usuario no proporcionado"]);
        }
        break;

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Método no permitido"]);
        break;
}
?>
