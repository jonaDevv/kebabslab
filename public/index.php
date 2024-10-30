<?php

require ("./MIautocargador.php");
require ("../vendor/autoload.php");

use App\Controllers\HomeController;

$controller = new HomeController();
$controller->index();

