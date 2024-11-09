<?php

namespace Models;

use PDO; // Importa PDO
use PDOException; 

class BdConnection {

    private static $con = null; // El tipo depende de la librería que usemos para la base de datos

    public static function getConnection(): PDO // Es el tipo de la clase conexión
    {
        // Ruta correcta al archivo de configuración
        $configJson = file_get_contents(__DIR__ . '/../config/config.json'); // Uso de __DIR__
        if ($configJson === false) {
            die("Error: No se pudo leer el archivo de configuración.");
        }

        $config = json_decode($configJson, true);
        if ($config === null) {
            die("Error: La configuración no es válida o está vacía.");
        }

        // Asignar valores de configuración
        $host = $config['host'];//nombre de contenedor
        $db = $config['db'];
        $user = $config['user'];
        $pass = $config['pass'];

        if (self::$con == null) {
            try {
                // Conectar a la base de datos
                self::$con = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
                self::$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Configurar PDO para lanzar excepciones
            } catch (PDOException $e) {
                // Manejo de errores de conexión
                die("Error en la conexión: " . $e->getMessage());
            }
        }

        return self::$con;
    } 
}
?>
