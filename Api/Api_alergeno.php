<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\Alergeno;
use Repository\repoAlergeno;


        
        $method = $_SERVER['REQUEST_METHOD'];
        
            switch ($method) {
            case 'GET':
                
                // Lógica para manejar GET (obtener uno o varios usuarios)
                //Método para estas funciones
                if (isset($_GET['id']) && !empty($_GET['id'])) {
                    
                    $id = $_GET['id'];

                    $alergeno = repoAlergeno::read($id); //; // Suponiendo que tienes un método read en el repositori

                } else {
                    // Obtener todos los usuarios
                    $alergenos = repoAlergeno::getAll(); // Suponiendo que tienes un método getAll en el repositorio

                }
                break;

            case 'POST':
                              
                            // Captura los datos del cuerpo de la solicitud
                    $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo

                    // Verificar si se recibieron todos los datos necesarios
                    if (
                        isset($data['nombre']) && isset($data['foto'])) 
                    {
                        // Crear el objeto Alergeno de forma similar
                        $alergeno = new Alergeno(
                            null,  
                            $data['nombre'],
                            $data['foto'],
                           
                        );

                        // Intentar crear el alergeno
                        if (repoAlergeno::create($alergeno)) {
                            http_response_code(201); // Alrgeno creado
                            echo json_encode(["message" => "Alergeno creado con éxito"]);
                        } else {
                            http_response_code(500); // Error en la creación
                            echo json_encode(["message" => "Error al crear el alergeno"]);
                        }


                    } else {
                        http_response_code(400); // Bad Request
                        echo json_encode(["message" => "Datos de alergeno inválidos"]);


                    }
                    break;
                    
                

            case 'PUT':
                
                    // Captura los datos del cuerpo de la solicitud
                    $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
                   
                    // Verificar si se recibió el ID
                    if (isset($data[0]['id'])) {
                        $id = $data[0]['id']; // ID del alergeno a actualizar
                
                        // Crear un nuevo objeto alergeno con los datos proporcionados
                        if($alerg=repoAlergeno::read($id)){

                            $alerg->setNombre($data[0]['nombre']??$alerg->getNombre());
                            $alerg->setFoto($data[0]['foto']??$alerg->getFoto());
                    
                            
                        }else{
                            return false;
                        }



                        header("Content-Type: application/json");
                        // Llamar al método de actualización del repositorio
                        if (repoAlergeno::update($id, $alerg)) {
                            http_response_code(200); // OK
                            echo json_encode(["message" => "Alergeno actualizado correctamente"]);
                        } else {
                            http_response_code(404); // Not Found
                            echo json_encode(["message" => "Alergeno no encontrado"]);
                        }

                    } else {
                        http_response_code(400); // Bad Request
                        echo json_encode(["message" => "ID de alergeno no proporcionado"]);
                    }
                    break;
                
                

            case 'DELETE':
                

                    // Lógica para manejar DELETE (eliminar un alergeno por ID)
                    if (isset($_GET['id'])) {
                        $id=$_GET['id'];
                        

                        header("Content-Type: application/json");
                        if (repoAlergeno::delete($id)) {
                            http_response_code(204); // No Content
                            echo json_encode(["message" => "Alergeno eliminado con éxito"]);
                        } else {
                            http_response_code(404); // Not Found
                            echo json_encode(["message" => "Alergeno no encontrado"]);
                        }


                    } else {
                        http_response_code(400); // Bad Request
                        echo json_encode(["message" => "ID de alergeno no proporcionado"]);
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