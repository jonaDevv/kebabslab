<?php
spl_autoload_register(function ($clase) {

    include_once ($_SERVER['DOCUMENT_ROOT']."/App/Controllers/HomeController.php");
  
    include_once ($_SERVER['DOCUMENT_ROOT']."/App/Models/Usuario.php");

    
});