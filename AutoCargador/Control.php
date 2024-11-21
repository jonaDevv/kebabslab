<?php
namespace AutoCargador;

use Helper\Login;

error_reporting(E_ALL); // Reporta todos los tipos de errores
ini_set('display_errors', 1); // Muestra errores en la salida
ini_set('display_startup_errors', 1); // Muestra errores en el inicio

// En "controllers/InicioController.php"
class Control {
    
    public static function index() {
        include __DIR__ . "/../vistas/principal/index.html";
    }

    // En "controllers/alGusto.php"
    public static function gusto() {
        include __DIR__ . '/../vistas/principal/verKebabGusto.html';
    }

    // En "controllers/carta.php"
    public static function carta() {
        include __DIR__ . '/../vistas/principal/carta.html';
    }

    // En "controllers/login.php"
    public static function openlogin() {
        include __DIR__ . '/../vistas/login/login.html';
    }

    // En "controllers/Registro.php"
    public static function openregistro() {
        include __DIR__ . '/../vistas/login/registro.php';
    }

    // En "controllers/LoginController.php"
    public static function autentifica() {
        require_once './Vistas/Login/autentifica.php';
    }

    public static function cerrarSesion() {
        
        Login::logout();
        header("Location:/?menu=inicio");
        exit();
    }

    // En "controllers/MantenimientoController.php"
    public static function mantenimiento() {
        require_once './Vistas/mantenimiento/mantenimiento.php';
    }

    public static function gProducto() {
        require_once './Vistas/mantenimiento/gProducto.php';
    }

    public static function gUsuario() {
        require_once './Vistas/mantenimiento/gUsuario.php';
    }

    public static function gPedido() {
        require_once './Vistas/mantenimiento/gPedido.php';
    }

    public static function gVenta() {
        require_once './Vistas/mantenimiento/gVenta.php';
    }
    
   
    // En "controllers/pedidos.php"

   

    // En "controllers/ErrorController.php"
    public static function notFound() {
        echo "Página no encontrada.";
    }
}
