<?php

    

require ("../MIautocargador.php");
require ("../vendor/autoload.php");

use Models\Usuario;
use Repository\repoUsuario;

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  

    case 'POST':
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data[0]['username']) && 
            isset($data[0]['password']) 
           
        ) {
           

            // // Crear el objeto Kebab
            // $kebab = new Kebab(
            //     null,  // ID se generará automáticamente
            //     $data[0]['nombre'],
            //     $data[0]['foto'],
            //     $data[0]['precio'],
            //     $data[0]['ingredientes']// Lista de ingredientes
            // );

            // // Intentar crear el kebab
            // if (repoKebab::create($kebab)) {
            //     http_response_code(201); // Kebab creado
            //     echo json_encode(["message" => "Kebab creado con éxito"]);
            // } else {
            //     http_response_code(500); // Error en la creación
            //     echo json_encode(["message" => "Error al crear el kebab"]);
            // }
            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de kebab inválidos"]);
        }
        break;

    

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}




?>