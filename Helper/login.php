<?php
namespace Helper;
Use Helper\sesion;

class Login
{
    public static function Identifica(string $usuario,string $contrasena,bool $recuerdame)
    {
        
    }

    private static function ExisteUsuario(string $usuario,string $contrasena=null)
    {
        
    }

    public static function UsuarioEstaLogueado()
    {
        
    }





    function login($nombre){ //Solo para USERRR

        //iniciaSesion();
        $_SESSION['user']=$nombre;

    }


    function logout(){

        
        //$_SESSION['USER']="";
        session_unset(); 
        // finalizaSesion();

    }


    function estaLogeado() {
        return isset($_SESSION['user']);
    }

    



    //1.Iniciar sesion
    //2. Si esta logeado?
}