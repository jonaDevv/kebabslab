<?php

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Repository\repoUsuario;
use Helper\Login;

$data = json_decode(file_get_contents("php://input"), true); // true convierte el JSON en un array asociativo
        
// Verificar si se recibieron todos los datos necesarios

    
   


        
        
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($data['nombre']) && 
            isset($data['password']) 
           
        ) {
            $username = $data['nombre'];
            $password = $data['password'];
           
            //Buscar en la base de datos si existe el usuario
            $usuario = repoUsuario::findByUsername($username);
            
            

            if ($usuario) {

                $existe=Login::existeUsuario($usuario,$password);

                
                if($existe){

                    Login::login($usuario);
                    if (isset($_SESSION['user'])) {
                        
                        echo json_encode(["success" => true]);
                    }
                    else {
                        http_response_code(404); // Not Found
                        echo "alert('error')";
                    }


                 } else {
                    http_response_code(404); // Not Found
                    echo "alert('error')";

                
                 


                }
                
               
                
               
            } else {
                http_response_code(404); // Not Found
                echo json_encode($data);
            }

           
            
        } else {
            http_response_code(400); // Bad Request
            echo json_encode($data);
        }

        

    
    
    




?>