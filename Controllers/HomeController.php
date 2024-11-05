<?php
namespace Controllers;


use League\Plates\Engine;
use Repository\repoUsuario;


class HomeController {
    protected $templates;

    public function __construct() {
        $this->templates = new Engine('templates');
    }

   // public function index() {
     //   $userModel = new User();
       /// $users = $userModel->getUsers();
        //echo $this->templates->render('home', ['users' => $users]);
    //}
    public function index() {

        $repoUsuario = new repoUsuario();
        $users = $repoUsuario->getAll();
        echo $this->templates->render('home', ['users' => $users]);
    }
}
