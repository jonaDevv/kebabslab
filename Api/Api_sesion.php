<?php
require ("../MIautocargador.php");
require ("../vendor/autoload.php");
session_start();

use Helper\Sesion;
use Helper\Login;
// Inicia la sesión

$method=$_SERVER['REQUEST_METHOD'];

header('Content-Type: application/json');
// Verifica si hay datos en la sesión
if (Sesion::existeClave('user')) {
    // Si la sesión está activa, devuelve el valor de la sesión en formato JSON
    echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);

} else {
    
    // Si no hay sesión activa, devuelve un error
    echo json_encode(['status' => 'error', 'message' => 'No session found']);
}


