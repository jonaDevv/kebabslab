<?php


    namespace Repository;
    use Models\BdConnection;
    use Models\Pedido;
    use Models\LineaPedido;
    use PDO; // Importa PDO
    use PDOException; 
     

    Class repoPedido implements RepoCrud{
        
       

        
        //METODOS CRUD

        public static function create($pedido) {
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para insertar un nuevo usuario
                $stmt = $conn->prepare("INSERT INTO pedido (usuario_id, fecha_hora, lineasPedido, estado, precio_total, coordenada, direccion) 
                                        VALUES (:usuario_id, :fecha_hora, :lineasPedido, :estado, :precio_total, :coordenada, :direccion)");
                                       
                
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto pedido
                $resultado = $stmt->execute([
                    'usuario_id' => $pedido->getUsuario_id(),
                    'fecha_hora' => $pedido->getFecha_hora(),
                    'lineasPedido' => $pedido->getLineasPedido(),
                    'estado' => $pedido->getEstado(),
                    'precio_total' => $pedido->getPrecio_total(),
                    'coordenada' => $pedido->getCoordenada(),
                    'direccion' => $pedido->getDireccion()
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
                
                $stmt = $conn->prepare("SELECT * FROM pedido WHERE id=:id");
                $stmt->execute(['id' => $id]);
                
                // Verificar qué registros se están obteniendo
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
                 
        
              if ($registro) {
                   
                    $pedido = new Pedido(
                        $registro->id,
                        $registro->usuario_id,
                        $registro->fecha_hora,
                        $registro->lineasPedido,
                        $registro->estado,
                        $registro->precio_total,
                        $registro->coordenada,
                        $registro->direccion
                    );

                    $stmtPedido = $conn->prepare("SELECT * FROM linea_pedido WHERE pedido_id=:pedido_id");
                    $stmtPedido->execute(['pedido_id' => $id]);

                  $pedidosArray = [];

                    while ($pedidoRow = $stmtPedido->fetch(PDO::FETCH_OBJ)) {
                        
                        $pedidoArray[] = new LineaPedido(
                            $pedidoRow->id,
                            $pedidoRow->kebabs,
                            $pedidoRow->cantidad,
                            $pedidoRow->precio,
                            $pedidoRow->pedido_id
                        );
                         
                        
                    }
                       
                        // Asignar el array de ingredientes al kebab
                    if (count($pedidosArray) > 0) {
                        $pedido->setLineasPedido($pedidosArray); // Asumimos que hay un método setIngredientes en la clase Kebab
                        
                    }
                    
                    
        
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($pedido); // Aquí devuelves el pedidoen formato JSON
                    return $pedido;
                    exit; // Termina la ejecución aquí para evitar enviar múltiples respuestas

                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "No se encontró el alergeno"]); 
                }

            } catch (PDOException $e) {
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
        

        
        public static function update($id, $pedido) {
            // Asegurarse de que el objeto pasado es de tipo Usuario
            if (!$pedido instanceof Pedido) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de pedido inválidos"]);
                return; // Salir de la función
            }
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                $conn->beginTransaction();
                // Preparar la sentencia SQL para actualizar un pedido existente
                $stmt = $conn->prepare("UPDATE pedido
                                        SET usuario_id = :usuario_id, fecha_hora = :fecha_hora,
                                         lineasPedido = :lineasPedido, estado = :estado,
                                          precio_total = :precio_total, coordenada = :coordenada, direccion = :direccion
                                        WHERE id = :id");

        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto pedido
                $resultado = $stmt->execute([

                    'id' => $id,
                    'usuario_id' => $pedido->getUsuario_id(),
                    'fecha_hora' => $pedido->getFecha_hora(),
                    'lineasPedido' => $pedido->getLineasPedido(),
                    'estado' => $pedido->getEstado(),
                    'precio_total' => $pedido->getPrecio_total(),
                    'coordenada' => $pedido->getCoordenada(),
                    'direccion' => $pedido->getDireccion()
    
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

                echo json_encode($pedido);
                


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
        
                // Preparar la sentencia SQL para eliminar el usuario
                $stmt = $conn->prepare("DELETE FROM pedido WHERE id = :id");
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
                $sql = "SELECT * FROM pedido"; 
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute();
        
                $pedidosArray = []; // Array para almacenar los usuarios
               
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    
                    $pedido = new Pedido(
                        $row->id, 
                        $row->usuario_id, 
                        $row->fecha_hora, 
                        $row->lineasPedido, 
                        $row->estado, 
                        $row->precio_total, 
                        $row->coordenada, 
                        $row->direccion
                    );
                    
                    $stmtlineaPedido = $conn->prepare("SELECT * FROM linea_pedido WHERE pedido_id=:pedido_id");
                    $stmtlineaPedido->execute(['pedido_id' => $row->id]);

                    $lineasPedidoArray = [];


                    
                        
                    while ($lineaPedidoRow = $stmtlineaPedido->fetch(PDO::FETCH_OBJ)) {
                        // Verifica que las propiedades existen antes de usarlas
                        $kebabs = isset($lineaPedidoRow->kebabs) ? $lineaPedidoRow->kebabs : 'Kebabs no disponibles';
                        $cantidad = isset($lineaPedidoRow->cantidad) ? $lineaPedidoRow->cantidad : 'Cantidad no disponible';
                        $precio = isset($lineaPedidoRow->precio) ? $lineaPedidoRow->precio : 'Precio no disponible';
                        $pedido_id = isset($lineaPedidoRow->pedido_id) ? $lineaPedidoRow->pedido_id : 'Pedido_id no disponible';

                        // Crear la instancia de Direccion con las propiedades validadas
                        $lineasPedidoArray[] = new LineaPedido(
                            $lineaPedidoRow->id,
                            $kebabs,
                            $cantidad,
                            $precio,
                            $pedido_id
                        );

                    }
                    
                    
                        
                        // Asignar el array de ingredientes al kebab
                    if (count($lineasPedidoArray) > 0) {
                        
                        $pedido->setLineasPedido($lineasPedidoArray); 
                        
                    
                    }
                    
                    // Convertir el objeto a un array y añadirlo a la lista de usuarios
                    $pedidosArray[] = $pedido->toJson(); // Asegúrate de que el método toArray() esté definido
                }


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        
                // Establecer la cabecera de tipo de contenido
                header("Content-Type: application/json");
                // Codificar el array de usuarios a JSON y devolverlo
                echo json_encode($pedidosArray);
                exit; // Terminar el script después de enviar la respuesta
            
        }








    }