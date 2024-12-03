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
    <script src="/ApiJs/Api_alergeno.js" ></script>
    
    <script src="/asset/js/general.js" defer></script>
    <script src="/asset/js/kebabGusto.js" defer></script>
    <script src="/asset/js/rellenarEdicionKebab.js"></script> 
    <script src="/asset/js/carta.js"></script>
    <script src="/asset/js/herramientas/validation.js"></script>
    <script src="/asset/js/perfilUsuario.js" defer></script>
    <script src="/asset/js/registro.js"></script>
    <script src="/ApiJs/Api_carrito.js" defer></script>
    <script src="/ApiJs/Api_usuario.js" defer></script>
    <script src="/ApiJs/Api_pedido.js" ></script>
    <script src="/asset/js/gpedidos.js"></script>
    <script src="/asset/js/finalizarCompra.js" ></script>
    <script src="/asset/js/modalCarrito.js" ></script>
    <script src="/asset/js/mispedidos.js" ></script>
    <script src="/asset/js/pMantenimientoKebab.js" ></script>
    <script src="/asset/js/pMantenimientoIngrediente.js" ></script>

    

    
    
    
    
    
    
    <link rel="stylesheet" href="../asset/css/istyle.css">
    <link rel="stylesheet" href="../asset/css/mstyle.css">
    <link rel="stylesheet" href="../asset/css/carritostyle.css">
    <link rel="stylesheet" href="../asset/css/menuGestion.css">
    <link rel="stylesheet" href="../asset/css/usuarioLogeado.css">
    <link rel="stylesheet" href="../asset/css/kebabGusto.css">
    <link rel="stylesheet" href="../asset/css/perfilUsuario.css">
    <link rel="stylesheet" href="../asset/css/gpedidos.css">
    <link rel="stylesheet" href="../asset/css/finalizarCompra.css">
    <link rel="stylesheet" href="../asset/css/modalCredito.css">
    <link rel="stylesheet" href="../asset/css/misPedidos.css">
    <link rel="stylesheet" href="../asset/css/mantenimientoKebab.css">
    <link rel="stylesheet" href="../asset/css/mantenimientoIngrediente.css">


    

    
    
    <link rel="icon" href="../asset/img/favicon1.png" type="image/x-icon">
</head>
<body>
    <?=$this->section('header')?>

    <?=$this->section('body')?>
    
    <?=$this->section('footer')?>

</body>
</html>
