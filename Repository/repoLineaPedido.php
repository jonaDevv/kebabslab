<?php


    namespace Repository;
    use Models\LineaPedido;
    use Models\BdConnection;
    use PDO; // Importa PDO
    use PDOException; 
     

    Class repolinearPedido implements RepoCrud{
        
       

        
        //METODOS CRUD

        public static function create($lineaPedido) {
            
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para insertar un nuevo usuario
                $stmt = $conn->prepare("INSERT INTO linea_pedido(pedido_id,cantidad,kebabs,precio)
                                                values(:pedido_id,:cantidad,:kebabs,:precio)");
        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto usuario
                $resultado = $stmt->execute([
                    'pedido_id' => $lineaPedido->getPedido_id(),
                    'cantidad' => $lineaPedido->getCantidad(),
                    'kebabs' => $lineaPedido->getKebabs(),
                    'precio' => $lineaPedido->getPrecio()]);
        
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
                    $lineaPedido= new LineaPedido(
                        $registro->id,
                        $registro->pedido_id,
                        $registro->cantidad,
                        $registro->kebabs,
                        $registro->precio
                    );
        
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($lineaPedido); 
                    return $lineaPedido;
                    exit; // Termina la ejecución aquí para evitar enviar múltiples respuestas

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
            
            if (!$lineaPedido instanceof LineaPedido) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de linea pedido inválidos"]);
                return; // Salir de la función
            }
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                $conn->beginTransaction();
                // Preparar la sentencia SQL para actualizar un alergeno existente
                $stmt = $conn->prepare("UPDATE linea_pedido
                                        SET pedido_id = :pedido_id, cantidad = :cantidad, kebabs = :kebabs, precio = :precio
                                        WHERE id = :id");
                                        
        
                
                $resultado = $stmt->execute([
                    'id' => $id,
                    'pedido_id' => $lineaPedido->getPedido_id(),
                    'cantidad' => $lineaPedido->getCantidad(),
                    'kebabs' => $lineaPedido->getKebabs(),
                    'precio' => $lineaPedido->getPrecio()
                    
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

                echo json_encode($lineaPedido);
                


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
                $sql = "SELECT * FROM linea_pedido"; // Cambia "usuario" por el nombre de tu tabla
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute();
        
                $lineaPedidoArray = []; 
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    
                    $lineaPedido = new LineaPedido($row->id, $row->pedido_id, $row->cantidad, $row->kebabs, $row->precio);
                    
                    $lineaPedidoArray = $lineaPedido->toJson(); // Asegúrate de que el método toArray() esté definido
                }


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        
                // Establecer la cabecera de tipo de contenido
                header("Content-Type: application/json");
                // Codificar el array de usuarios a JSON y devolverlo
                echo json_encode($$lineaPedidoArray);
                exit; // Terminar el script después de enviar la respuesta
            
        }








    }