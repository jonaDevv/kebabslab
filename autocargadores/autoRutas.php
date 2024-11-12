<?php

error_reporting(E_ALL); // Reporta todos los tipos de errores
ini_set('display_errors', 1); // Muestra errores en la salida
ini_set('display_startup_errors', 1); // Muestra errores en el inicio

// En "controllers/InicioController.php"
class InicioController {
    public function index() {
        include __DIR__ ."/../vistas/principal/index.html"; // o lo que sea necesario para esta acción
    }
}

class alGusto {
    public function gusto() {
        include __DIR__ . '/../vistas/principal/crearKebab.html'; // o lo que sea necesario para esta acción
    }


}

class carta {
    public function carta() {
        include __DIR__ . '/../vistas/principal/carta.html'; // o lo que sea necesario para esta acción
    }


}

class login {
    public function openlogin() {
        include __DIR__ . '/../vistas/login/login.html'; // o lo que sea necesario para esta acción
    }


}


// En "controllers/LoginController.php"
class LoginController {
    public function autentifica() {
        require_once './Vistas/Login/autentifica.php';
    }

    public function cerrarSesion() {
        require_once './Vistas/Login/cerrarsesion.php';
    }
}

// En "controllers/MantenimientoController.php"
class MantenimientoController {
    public function mantenimiento() {
        require_once './Vistas/mantenimiento/mantenimiento.php';
    }

    public function listadoAnimales() {
        require_once './Vistas/Mantenimiento/listadoanimales.php';
    }

    public function listadoVacunas() {
        require_once './Vistas/Mantenimiento/listadovacunas.php';
    }
}

// En "controllers/ErrorController.php"
class ErrorController {
    public function notFound() {
        echo "Página no encontrada.";
    }
}