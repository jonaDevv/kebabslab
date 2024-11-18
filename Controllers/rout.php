<?php
namespace Controllers;

use AutoCargador\Control;
// Asegúrate de que el autoload esté configurado
 // Esto puede ser tu archivo de autoload o configuración del autoload según tu estructura
class rout{

    public static function rout(){
        if (isset($_GET['menu'])) {
            $menu = $_GET['menu'];

            // Usamos match para determinar qué clase instanciar
            match ($menu) {
                "inicio" => (Control::index()),
                "login" => (Control::openlogin()),
                "registro" => (Control::openregistro()),
                "cerrarsesion" => (Control::cerrarSesion()),
                "mantenimiento" => (Control::mantenimiento()),
                "gusto" => (Control::gusto()),
                "carta" => (Control::carta()),
                "pedidos" => (Control::pedidos()),
                default => (Control::notFound()) // Controlador de error si no se encuentra el menú
            };
            
        }else{

            (Control::index());

        }   
    }
}

?>