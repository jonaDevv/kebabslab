<?php
namespace AutoCargador;

error_reporting(E_ALL); // Reporta todos los tipos de errores
ini_set('display_errors', 1); // Muestra errores en la salida
ini_set('display_startup_errors', 1); // Muestra errores en el inicio

// En "controllers/InicioController.php"
class ControlHead {
    
    public static function default() {
        include __DIR__ . "/../vistas/header/headerDeafault.html";
    }

    // En "controllers/alGusto.php"
    public static function usuario() {
        include __DIR__ . '/../vistas/header/headerUsuario.html';
    }

    // En "controllers/carta.php"
    public static function administrador() {
        include __DIR__ . '/../vistas/header/headerAdministrador.html';
    }

    // En "controllers/login.php"
    public static function camarero() {
        include __DIR__ . '/../vistas/login/login.html';
    }

    // En "controllers/Registro.php"
    public static function cocinero() {
        include __DIR__ . '/../vistas/login/registro.php';
    }

   

    // En "controllers/ErrorController.php"
    public static function notFound() {
        echo "Página no encontrada.";
    }
}
