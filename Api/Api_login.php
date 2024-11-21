<?php

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Repository\repoUsuario;
use Helper\Login;




        
        
        // Verificar si se recibieron todos los datos necesarios
        if (
            isset($_POST['nombre']) && 
            isset($_POST['password']) 
           
        ) {
            $username = $_POST['nombre'];
            $password = $_POST['password'];
           
            //Buscar en la base de datos si existe el usuario
            $usuario = repoUsuario::findByUsername($username);
            
            

            if ($usuario) {

                $existe=Login::existeUsuario($usuario,$password);

                
                if($existe){

                    Login::login($usuario);
                    if (isset($_SESSION['user'])) {
                        var_dump($_SESSION);
                    // Redirigir a otra página
                        header("Location:/?menu=inicio");
                        exit();
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
                echo "alert('error')";
            }

           
            
        } else {
            http_response_code(400); // Bad Request
            echo "alert('error')";
        }

        

    
    
    




?>