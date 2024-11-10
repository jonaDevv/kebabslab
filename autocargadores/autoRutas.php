<?php

// En "controllers/InicioController.php"
class InicioController {
    public function index() {
        require_once ""; // o lo que sea necesario para esta acción
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