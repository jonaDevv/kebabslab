<?php
spl_autoload_register(function ($clase) {

    include_once ($_SERVER['DOCUMENT_ROOT']."/Controllers/HomeController.php");
  
    include_once ($_SERVER['DOCUMENT_ROOT']."/Models/Usuario.php");
    
    


    
});