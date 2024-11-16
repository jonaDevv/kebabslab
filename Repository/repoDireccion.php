<?php


    namespace Repository;
    use Models\Direccion;
    use Models\BdConnection;
    use PDO; // Importa PDO
    use PDOException; 
     

    Class repoDireccion implements RepoCrud{
        
       

        
        //METODOS CRUD

        public static function create($direccion) {
            
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para insertar un nuevo usuario
                $stmt = $conn->prepare("INSERT INTO direccion (direccion, cordenadas, usuario_id) 
                                        VALUES (:direccion, :cordenadas, :usuario_id)");
        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto usuario
                $resultado = $stmt->execute([
                    'direccion' => $direccion->getDireccion(),
                    'cordenadas' => $direccion->getCordenadas(),
                    'usuario_id' => $direccion->getUsuario_id()]);
        
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
                $stmt = $conn->prepare("SELECT * FROM direccion WHERE id=:id");
                $stmt->execute(['id' => $id]);
                
                // Verificar qué registros se están obteniendo
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
                 
        
                if ($registro) {
                    $direccion = new Direccion(
                        $registro->id,
                        $registro->usuario_id,
                        $registro->direccion,
                        $registro->cordenadas,
                    );
        
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($direccion); // Aquí devuelves el usuario en formato JSON
                    return $direccion;
                    exit; // Termina la ejecución aquí para evitar enviar múltiples respuestas

                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "No se encontró la direccion"]); 
                }

            } catch (PDOException $e) {
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
        

        
        public static function update($id, $direccion) {
            
            if (!$direccion instanceof Direccion) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de usuario inválidos"]);
                return; // Salir de la función
            }
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                $conn->beginTransaction();
                // Preparar la sentencia SQL para actualizar un alergeno existente
                $stmt = $conn->prepare("UPDATE direccion
                                        SET direccion = :direccion, cordenadas = :cordenadas, usuario_id = :usuario_id
                                        WHERE id = :id");
                                        
        
                
                $resultado = $stmt->execute([
                    'id' => $id,
                    'direccion' => $direccion->getDireccion(),
                    'cordenadas' => $direccion->getCordenadas(),
                    'usuario_id' => $direccion->getUsuario_id()
                    
                ]);

                header("Content-Type: application/json");

                

                // Verificar si la actualización fue exitosa
                if ($resultado) {
                   
                    $conn->commit();
                    return true;
                } else {
                    $conn->commit();
                    return false;
                }

                echo json_encode($direccion);
                


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP
                $conn->rollBack();
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
            }
        }
        
        


        public static function delete($id) {
            try {
                $conn = BdConnection::getConnection();
        
                
                $stmt = $conn->prepare("DELETE FROM direccion WHERE id = :id");
                $stmt->execute(['id' => $id]);
                
               

                // Verificar cuántas filas fueron afectadas
                if ($stmt->rowCount() > 0) { 
                    
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
                $sql = "SELECT * FROM direccion"; // Cambia "usuario" por el nombre de tu tabla
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute();
        
                $direccionArray = []; 
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    
                    $direccion = new Direccion($row->id,$row->usuario_id, $row->direccion, $row->cordenadas) ;
                    
                    $direccionArray[] = $direccion->toJson(); // Asegúrate de que el método toArray() esté definido
                }


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        
                // Establecer la cabecera de tipo de contenido
                header("Content-Type: application/json");
                // Codificar el array de usuarios a JSON y devolverlo
                echo json_encode($direccionArray);
                exit; // Terminar el script después de enviar la respuesta
            
        }








    }