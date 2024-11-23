<?php
namespace Controllers;

use AutoCargador\ControlHead;
// Asegúrate de que el autoload esté configurado
 // Esto puede ser tu archivo de autoload o configuración del autoload según tu estructura
class routHead{

    public static function routHead(){
        if (isset($_SESSION['user']['rol'])) {
            $rol = $_SESSION['user']['rol'];

            // Usamos match para determinar qué clase instanciar
            match ($rol) {
                "usuario" => (ControlHead::usuario()),
                "administrador" => (ControlHead::administrador()),
                "cocinero" => (ControlHead::cocinero()),
                "camarero" => (ControlHead::camarero()),
                default => (ControlHead::notFound()) // Controlador de error si no se encuentra el menú
            };
            
        }else{

            (ControlHead::default());

        }   
    }
}

?>