/* The class `repoAlergeno` implements CRUD operations for managing allergens in a database using PHP
and PDO. */
<?php


    namespace Repository;
    use Models\Alergeno;
    use Models\BdConnection;
    use PDO; // Importa PDO
    use PDOException; 
     

    Class repoAlergeno implements RepoCrud{
        
        private static $listaAlergenos = [];

        
        //METODOS CRUD

        /**
         * The `create` function in PHP is used to insert a new record into the `alergeno` table with
         * the provided data, handling potential errors and returning a success or failure status.
         * 
         * @param alergeno The `create` function you provided seems to be a method for creating a new
         * record in a database table for an "alergeno" object. It takes an `` parameter which
         * is expected to be an object with `getNombre()` and `getFoto()` methods to retrieve the
         * 
         * @return The `create` function is returning a boolean value. If the insertion of the new
         * "alergeno" (allergen) into the database is successful, it returns `true`. If there is an
         * error during the insertion process or an exception is caught, it returns `false`.
         * Additionally, in case of a database error, it sets the HTTP response status to indicate a
         * server error and returns
         */
        public static function create($alergeno) {
            // Asegurarse de que el objeto pasado es de tipo Usuario
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para insertar un nuevo usuario
                $stmt = $conn->prepare("INSERT INTO alergeno (nombre, foto) 
                                        VALUES (:nombre, :foto)");
        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto usuario
                $resultado = $stmt->execute([
                    'nombre' => $alergeno->getNombre(),
                    'foto' => $alergeno->getFoto(),
                    
                ]);
        
                // Verificar si la inserción fue exitosa
                if ($resultado) {
                    
                    return true;
                } else {
                    
                    return false;
                }
                
            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                return false;
            }
        }
        
        public static function read($id) { 
            $conn = BdConnection::getConnection();
            
            try {
                $stmt = $conn->prepare("SELECT * FROM alergeno WHERE id=:id");
                $stmt->execute(['id' => $id]);
                
                // Verificar qué registros se están obteniendo
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
                 
        
                if ($registro) {
                    $alergeno = new Alergeno(
                        $registro->id,
                        $registro->nombre,
                        $registro->foto,
 
                    );
        
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($registro); // Aquí devuelves el usuario en formato JSON
                    exit; // Termina la ejecución aquí para evitar enviar múltiples respuestas

                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "No se encontró el usuario"]); 
                }
            } catch (PDOException $e) {
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
        

        
        public static function update($id, $alergeno) {
            // Asegurarse de que el objeto pasado es de tipo Usuario
            if (!$alergeno instanceof Alergeno) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de usuario inválidos"]);
                return; // Salir de la función
            }
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para actualizar un usuario existente
                $stmt = $conn->prepare("UPDATE alergeno
                                        SET nombre = :nombre, foto = :foto
                                        WHERE id = :id");
        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto usuario
                $resultado = $stmt->execute([
                    'id' => $id,  // Usa el parámetro $id para especificar el usuario a actualizar
                    'nombre' => $alergeno->getNombre(),
                    'foto' => $alergeno->getFoto(),

                ]);

                header("Content-Type: application/json");

                // Verificar si la actualización fue exitosa
                if ($resultado) {
                   
                    return true;
                } else {
                    
                    return false;
                }

               
                echo json_encode($alergeno);


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
            }
        }
        
        


        public static function delete($id) {
            try {
                $conn = BdConnection::getConnection();
        
                // Preparar la sentencia SQL para eliminar el usuario
                $stmt = $conn->prepare("DELETE FROM alergeno WHERE id = :id");
                $stmt->execute(['id' => $id]);
                
               

                // Verificar cuántas filas fueron afectadas
                if ($stmt->rowCount() > 0) {
                    // Si se eliminó al menos un usuario, enviar código 200 OK
                   
                    
                    return true;
                    
                } else {
                   
                    return false;
                }
            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
         
        
        public static function getAll()
        {
                // Obtener la conexión a la base de datos
                $conn = BdConnection::getConnection();
                
            try {  
                // Preparar la consulta
                $sql = "SELECT * FROM alergeno"; // Cambia "usuario" por el nombre de tu tabla
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute();
        
                $alergenosArray = []; // Array para almacenar los usuarios
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    // Crear un nuevo objeto $usuario
                    $alergeno = new Alergeno($row->id, $row->nombre, $row->foto);
                    // Convertir el objeto a un array y añadirlo a la lista de usuarios
                    $alergenosArray[] = $alergeno->toArray(); // Asegúrate de que el método toArray() esté definido
                }


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        
                // Establecer la cabecera de tipo de contenido
                header("Content-Type: application/json");
                // Codificar el array de usuarios a JSON y devolverlo
                echo json_encode($alergenosArray);
                exit; // Terminar el script después de enviar la respuesta
            
        }








    }