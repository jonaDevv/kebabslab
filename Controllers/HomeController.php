<?php
namespace Controllers;

use League\Plates\Engine;


class HomeController {
    protected $templates;

    public function __construct() {
        // Configura Plates para que utilice el directorio correcto de plantillas
        $this->templates = new Engine('./templates'); // Ajusta la ruta aquí si es necesario
    }

    public function index() {
        // Puedes usar la instancia $this->templates creada en el constructor
        echo $this->templates->render('home');
    }
}
?>
