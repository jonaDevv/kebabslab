<?php


    namespace Repository;
    use Models\LineaPedido;
    use Models\BdConnection;
    use PDO; // Importa PDO
    use PDOException;
    use Exception;
     

    Class repolineaPedido implements RepoCrud{
        
       

        
        //METODOS CRUD

        public static function create($lineaPedido) {
            
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para insertar un nuevo pedido
                $stmt = $conn->prepare("INSERT INTO linea_pedido (pedido_id, cantidad, kebabs, precio)
                VALUES (:pedido_id, :cantidad, :kebabs, :precio)");

                // Asegúrate de convertir 'kebabs' a JSON si es un array o un objeto
                $kebabsJson = json_encode($lineaPedido->getKebabs());

                // Verificar si la conversión a JSON fue exitosa
                if ($kebabsJson === false) {
                // Manejar el error si no se pudo convertir 'kebabs' a JSON
                echo json_encode(["error" => "Error al convertir kebabs a JSON"]);
                exit;
                }

                // Ejecutar la sentencia, asignando valores de las propiedades del objeto lineaPedido
                $resultado = $stmt->execute([
                'pedido_id' => $lineaPedido->getPedido_id(),
                'cantidad' => $lineaPedido->getCantidad(),
                'kebabs' => $kebabsJson,  // Pasamos la cadena JSON
                'precio' => $lineaPedido->getPrecio()
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
                $stmt = $conn->prepare("SELECT * FROM linea_pedido WHERE id=:id");
                $stmt->execute(['id' => $id]);
                
                // Verificar qué registros se están obteniendo
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
                
                 
        
                if ($registro) {
                    $kebabs = json_decode($registro->kebabs, true);
                    
                    $lineaPedido= new LineaPedido(
                        $registro->id,
                        $registro->pedido_id,
                        $registro->cantidad,
                        $kebabs,
                        $registro->precio
                    );

                  
        
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($lineaPedido); 
                    return $lineaPedido;
                    exit; 

                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "No se encontró la línea de pedido"]); 
                }

            } catch (PDOException $e) {
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
        

        
        public static function update($id, $lineaPedido) {
            // Verificar si la línea de pedido es válida
            if (!$lineaPedido instanceof LineaPedido) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de linea pedido inválidos"]);
                return; // Salir de la función
            }
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                $conn->beginTransaction();
                
        
                // Convertir kebabs a JSON si es necesario
                $kebabsJson = json_encode($lineaPedido->getKebabs());
                
                // Verificar si la conversión fue exitosa
                if ($kebabsJson === false) {
                    // Manejar el error si la conversión falla
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(["error" => "Error al convertir kebabs a JSON"]);
                    return;
                }
        
                // Preparar la sentencia SQL para actualizar la línea de pedido
                $stmt = $conn->prepare("UPDATE linea_pedido
                                        SET pedido_id = :pedido_id, cantidad = :cantidad, kebabs = :kebabs, precio = :precio
                                        WHERE id = :id");
        
                // Ejecutar la sentencia
                $resultado = $stmt->execute([
                    'id' => $id,
                    'pedido_id' => $lineaPedido->getPedido_id(),
                    'cantidad' => $lineaPedido->getCantidad(),
                    'kebabs' => $kebabsJson,  // Pasar el JSON codificado
                    'precio' => $lineaPedido->getPrecio()
                ]);
        
                // Comprobar si la actualización fue exitosa
                if ($resultado) {

                    $conn->commit();
                    header("Content-Type: application/json");
                    echo json_encode(["message" => "Línea de pedido actualizada correctamente"]);
                    return true;
                } else {
                    
                    return false;
                    header("HTTP/1.1 400 Bad Request");
                    echo json_encode(["error" => "No se pudo actualizar la línea de pedido"]);
                }
        
            } catch (PDOException $e) {
                // Manejo de errores en caso de excepción
                $conn->rollBack();
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
            }
        }
        
        


        public static function delete($id) {
            try {
                $conn = BdConnection::getConnection();
        
                
                $stmt = $conn->prepare("DELETE FROM linea_pedido WHERE id = :id");
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
                $sql = "SELECT * FROM linea_pedido"; 
                $stmt = $conn->prepare($sql);
               
                // Ejecutar la consulta
                $stmt->execute();

                $lineaPedidoArray = []; 
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    
                    // Decodificar el campo kebabs (JSON en formato cadena)
                    $kebabs = json_decode($row->kebabs, true); // Decodificar el JSON de kebabs
                    
                    // Verificar si la decodificación fue exitosa
                    if ($kebabs === null) {
                        throw new Exception('Error al decodificar el campo kebabs');
                    }

                    // Crear el objeto LineaPedido
                    $lineaPedido = new LineaPedido($row->id, $row->pedido_id, $row->cantidad, $kebabs, $row->precio);
                    
                    // Agregar la línea de pedido a la respuesta
                    $lineaPedidoArray[] = $lineaPedido->toJson(); 
                }




                // Establecer la cabecera de tipo de contenido
                header("Content-Type: application/json");
                // Codificar el array de línea de pedidos a JSON y devolverlo
                echo json_encode($lineaPedidoArray);
                exit; // Terminar el script después de enviar la respuesta




            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                exit;
                
            } catch (Exception $e) {
                // Manejo de errores en la decodificación de kebabs
                header('HTTP/1.1 500 Error al procesar el JSON de kebabs');
                echo json_encode(["error" => $e->getMessage()]);
                exit;
            }

            
        }



    }
    