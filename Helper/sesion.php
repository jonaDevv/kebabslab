<?php
namespace Helper;

class Sesion
{
    public static function iniciar()
    {
        
    }

    public static function leer(string $clave)
    {
        
    }

    public static function existe(string $clave)
    {
        
    }

    public static function escribir($clave,$valor)
    {
        
    }

    public static function eliminar($clave)
    {
        
    }




    //----------

    public static function iniciaSesion() {
        if (session_status() === PHP_SESSION_NONE) {
                session_start();
        }
    }


    

    public static function finalizaSesion(){

        session_destroy();
    
    }

    //Escribir sesion   escribirSesion(user,nombre);
    public static function leerSesion($clave){// Dice si existe o no. Devuelve true o false

        (isset($_SESSION[$clave]))? $respuesta=$_SESSION[$clave]: $respuesta="Desconocido";

        return $respuesta;
    }

    public static function existeClave($clave):bool
    {// Dice si existe o no. Devuelve true o false

        return isset($_SESSION[$clave]);
    }



    //Leer la sesion
    function escribirSesion($clave,$valor){ //Guardar cualquier clave valor

        
        $_SESSION[$clave]=$valor;


    }

    
}