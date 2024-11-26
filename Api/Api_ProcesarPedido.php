<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require ("../MIautocargador.php");
require ("../vendor/autoload.php");


use Models\Pedido;
use Repository\repoPedido;

    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        }
    }

    switch ($method) {
        case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            var_dump($data[0]['lineasPedido']);

           
            
            // Convertir a JSON
            $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

            // Mostrar el JSON resultante
            
            echo $json;
            
            break;
        case 'GET':
            $pedido = repoPedido::read($idPedido);
            break;
        default:
            break;
    }   


?>