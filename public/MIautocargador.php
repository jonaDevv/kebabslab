<?php
spl_autoload_register(function ($clase) {

    include_once ($_SERVER['DOCUMENT_ROOT']."/htdocs/plantillas/App/Controllers/HomeController.php");
  
    include_once ($_SERVER['DOCUMENT_ROOT']."/htdocs/plantillas/App/Models/User.php");

    
});