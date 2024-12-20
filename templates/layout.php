<?php
use Helper\Sesion;

Sesion::iniciaSesion();

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>KEBABSLAB</title>
    <script src="/asset/js/modalLogin.js" defer></script>
    <script src="/asset/js/modalCarrito.js" defer></script>
    <script src="/ApiJs/Api_kebab.js" defer></script>
    <script src="/ApiJs/Api_ingrediente.js" defer></script>
    
    <script src="/asset/js/general.js" defer></script>
    <script src="/asset/js/gestionPedidos.js" defer></script>
    <script src="/asset/js/kebabGusto.js" defer></script>
    <script src="/asset/js/rellenarEdicionKebab.js"></script> 
    <script src="/asset/js/carta.js"></script>
    <script src="/asset/js/herramientas/validation.js"></script>
    <script src="/asset/js/registro.js"></script>
    <script src="/ApiJs/Api_carrito.js" defer></script>

    
    
    
    
    
    
    <link rel="stylesheet" href="../asset/css/istyle.css">
    <link rel="stylesheet" href="../asset/css/mstyle.css">
    <link rel="stylesheet" href="../asset/css/carritostyle.css">
    <link rel="stylesheet" href="../asset/css/menuGestion.css">
    <link rel="stylesheet" href="../asset/css/usuarioLogeado.css">
    <link rel="stylesheet" href="../asset/css/kebabGusto.css">
    


    

    
    
    <link rel="icon" href="../asset/img/favicon1.png" type="image/x-icon">
</head>
<body>
    <?=$this->section('header')?>

    <?=$this->section('body')?>
    
    <?=$this->section('footer')?>

</body>
</html>
