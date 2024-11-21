<?php
require_once("Helper/Sesion.php");
require ("MIautocargador.php");
require ("./vendor/autoload.php");

use Controllers\HomeController;

$controller = new HomeController(); 
$controller->index();


?>

