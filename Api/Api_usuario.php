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
                    var_dump($_GET);
                    $id = $_GET['id'];
                    $usuario = repoUsuario::read($id); //; // Suponiendo que tienes un método read en el repositori

                } else {
                    // Obtener todos los usuarios
                    $usuarios = repoUsuario::getAll(); // Suponiendo que tienes un método getAll en el repositorio

                }
                break;

            case 'POST':
                              
                            // Captura los datos del cuerpo de la solicitud
                    $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo

                    // Verificar si se recibieron todos los datos necesarios
                    if (
                        isset($data['nombre']) && 
                        isset($data['password']) && 
                        isset($data['direccion']) && 
                        isset($data['rol']) && 
                        isset($data['monedero']) && 
                        isset($data['foto']) && 
                        isset($data['carrito'])) 
                    {
                        // Crear el objeto Usuario de forma similar
                        $usuario = new Usuario(
                            null,  
                            $data['nombre'],
                            $data['password'],
                            $data['direccion'],
                            $data['rol'],
                            floatval($data['monedero']),
                            $data['foto'],
                            $data['carrito']
                        );

                        // Intentar crear el usuario
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
                    var_dump($data);
                    // Verificar si se recibió el ID
                    if (isset($data['id'])) {
                        $id = $data['id']; // ID del usuario a actualizar
                
                        // Crear un nuevo objeto Usuario con los datos proporcionados
                        $usuario = new Usuario(
                            $data['id'],  // ID del usuario
                            $data['nombre'] ?? null,
                            $data['password'] ?? null, // No deberías actualizar la contraseña sin confirmación
                            $data['direccion'] ?? null,
                            $data['rol'] ?? null,
                            $data['monedero'] ?? null,
                            $data['foto'] ?? null,
                            $data['carrito'] ?? null
                        );
                        header("Content-Type: application/json");
                        // Llamar al método de actualización del repositorio
                        if (repoUsuario::update($id, $usuario)) {
                            http_response_code(200); // OK
                            echo json_encode(["message" => "Usuario actualizado correctamente"]);
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
                        $id=$_GET['id'];
                        

                        header("Content-Type: application/json");
                        if (repoUsuario::delete($id)) {
                            http_response_code(204); // No Content
                            echo json_encode(["message" => "Usuario eliminado con éxito"]);
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
                var_dump($_GET);
                echo json_encode(["message" => "Método no permitido"]);
                break;
        }

   

?>