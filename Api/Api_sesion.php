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

if ($method === 'POST') {

    // Recibir el JSON desde JavaScript
    $rawData = file_get_contents("php://input");
    $carrito = json_decode($rawData, true); // Convertir JSON a un array asociativo

    if (json_last_error() === JSON_ERROR_NONE) {
        // Asegúrate de que exista la clave 'user' en la sesión
        if (!isset($_SESSION['user'])) {
            $_SESSION['user'] = [];
        }
        // Guarda el carrito en $_SESSION['user']['carrito']
        $_SESSION['user']['carrito'] = $carrito;

        echo "Carrito almacenado exitosamente.";
    } else {
        echo "Error al decodificar JSON.";
    }

    
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Comprueba si hay un usuario en la sesión
    if (isset($_SESSION['user'])) {
        // Comprueba si el carrito está guardado en la sesión
        if (isset($_SESSION['user']['carrito'])) {
            // Si el carrito existe, devolverlo en formato JSON
            echo json_encode(['status' => 'success', 'carrito' => $_SESSION['user']['carrito']]);
        } else {
            // Si no hay carrito, devolver un carrito vacío
            echo json_encode(['status' => 'success', 'carrito' => []]);
        }
    } else {
        // Si no hay un usuario en la sesión, devolver un error
        echo json_encode(['status' => 'error', 'message' => 'No user session found']);
    }
} else {
    // Si la solicitud no es GET, devolver un error de método no permitido
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}


?>