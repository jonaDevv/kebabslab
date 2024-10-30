<?php


Class BdConnection{

        private static  $con= null; //El tipo depende de la libreria que usemos pra la base de datos

        public static function getConnection() : PDO //Es el tipo de la clase conexion
        {
            $host = '127.0.0.1'; // Cambia localhost a 127.0.0.1
            $db = 'kebapsBD';
            $user = 'root';
            $pass = '123456DAW.';

           
              
            if(self::$con == null){

                try{
                    
                    //Ir a fichero de conexion y leer desde ahi
                    self::$con = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);

                    
                } catch (PDOException $e) {
                        // Manejo de errores de conexión
                        die("Error en la conexión: " . $e->getMessage());
                }
               
            } 

            return self::$con;


        } 

}



?>