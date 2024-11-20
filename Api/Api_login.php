<?php

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Repository\repoUsuario;
use Helper\Login;

$method = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Se requiere un contenido JSON"]);
    exit();

}

   
if ($method == 'POST') {
        
        // Captura los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
       
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data[0]['nombre']) && 
            isset($data[0]['password']) 
           
        ) {
           
            //Buscar en la base de datos si existe el usuario
            $usuario = repoUsuario::findByUsername($data[0]['nombre']);
            
            

            if ($usuario) {
                $existe=Login::existeUsuario($usuario, $data[0]['password']);

                
                if($existe){

                    header("Content-Type: application/json");
                    Login::login($usuario);
                    var_dump($_SESSION['user']);
                    
                    echo json_encode(["success" => true]);
                    
                    exit();

                    


                }
                
               
                
               
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Usuario no encontrado"]);
            }

           
            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Datos de usuario inválidos"]);
        }

        

    
    }else{
        
        // Lógica para manejar métodos no permitidos (opcional)
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido"]);
        
    }

    




?>