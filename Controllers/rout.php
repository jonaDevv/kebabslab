
<?php

// Asegúrate de que el autoload esté configurado
require_once "./autocargadores/autoRutas.php"; // Esto puede ser tu archivo de autoload o configuración del autoload según tu estructura

if (isset($_GET['menu'])) {
    $menu = $_GET['menu'];

    // Usamos match para determinar qué clase instanciar
    match ($menu) {
        "inicio" => (new InicioController())->index(),
        "login" => (new login())->openlogin(),
        "cerrarsesion" => (new LoginController())->cerrarSesion(),
        "mantenimiento" => (new MantenimientoController())->mantenimiento(),
        "gusto" => (new alGusto())->gusto(),
        "carta" => (new carta())->carta(),
        "listadovacunas" => (new MantenimientoController())->listadoVacunas(),
        default => (new ErrorController())->notFound() // Controlador de error si no se encuentra el menú
    };
    
}else{

    (new InicioController())->index();

    
}

?>