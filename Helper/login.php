<?php
namespace Helper;

use Helper\Sesion;



class Login
{
    public static function Identifica(string $usuario,string $contrasena,bool $recuerdame)
    {

        






        
        
    }

    /** 
     * 
     * @param Usuario $usuario 
     * @param string $contrasena 
     * @return bool
     */
    public static function existeUsuario($usuario,string $contrasena=null)
    {
        //
        $passUser = $usuario->password;

        if ($passUser == $contrasena){

            return true;
        }
        
    }




    public static function UsuarioEstaLogueado()
    {

        
    }





    function login($nombre){ //Solo para USERRR

        Sesion::iniciaSesion();
        $_SESSION['user']=$nombre;

    }


    function logout(){

        
        $_SESSION['USER']="";
        session_unset(); 
        Sesion::finalizaSesion();

    }


    function estaLogeado() {
        return isset($_SESSION['user']);
    }

    



   
}