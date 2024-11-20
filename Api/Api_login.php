<?php

    

require ("../MIautocargador.php");
require ("../vendor/autoload.php");

use Models\Usuario;
use Repository\repoUsuario;
use Helper\Login;

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
           
            //Buscar en la base de datos si existe el usuario
            $usuario = repoUsuario::findByUsername($data[0]['username']);
            
            if ($usuario) {

                $existe=Login::existeUsuario($usuario, $data[0]['password']);

                if($existe){

                    



                }
                
               
                
               
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Usuario no encontrado"]);
            }

           
            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de usuario inválidos"]);
        }
        break;

    

    default:
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        break;
}




?>