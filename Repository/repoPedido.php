<?php


    namespace Repository;
    use Models\BdConnection;
    use Models\Pedido;
    use Models\LineaPedido;
    use PDO; // Importa PDO
    use PDOException; 
    use Exception;
    use DateTime;
     

    Class repoPedido implements RepoCrud{
        
       

        
        //METODOS CRUD

        public static function create($pedido) {
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para insertar un nuevo usuario
                $stmt = $conn->prepare("INSERT INTO pedido (usuario_id, estado, precio_total,  direccion) 
                                        VALUES (:usuario_id,:estado, :precio_total,  :direccion)");
                                       
                
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto pedido
                $resultado = $stmt->execute([
                    'usuario_id' => $pedido->getUsuario_id(),
                    'estado' => $pedido->getEstado(),
                    'precio_total' => $pedido->getPrecio_total(),
                    'direccion' => $pedido->getDireccion()
                ]);
                
                $pedidoId = $conn->lastInsertId();

                // Insertar nuevas relaciones
                $lineas = $pedido->getLineasPedido();
                
                
                if (!is_array($lineas)) {
                    throw new Exception("El método getLineasPedido() no devolvió un array.");
                }
        
                foreach ($lineas as $linea) {
                    
                    
                        
                        
                        //$lineaId = $linea['id'];
                        //error_log("Insertando relación: pedido_id = $pedidoId, linea_id = $lineaId");
                        
                                // Asegúrate de convertir 'kebabs' a JSON si es un array o un objeto
                        $kebabsJson = json_encode($linea['kebabs']);

                        // Preparar la sentencia SQL para insertar un nuevo pedido
                        $stmt = $conn->prepare("

                             INSERT INTO linea_pedido (pedido_id, cantidad, kebabs, precio)
                            VALUES (:pedido_id, :cantidad, :kebabs, :precio)
                        
                        ");

                        // Verificar si la conversión a JSON fue exitosa
                        if ($kebabsJson === false) {
                        // Manejar el error si no se pudo convertir 'kebabs' a JSON
                        echo json_encode(["error" => "Error al convertir kebabs a JSON"]);
                        exit;
                        }

                        // Ejecutar la sentencia, asignando valores de las propiedades del objeto lineaPedido
                        $stmt->execute([
                        'pedido_id' => $pedidoId,
                        'cantidad' => $linea['cantidad'],
                        'kebabs' => $kebabsJson,  // Pasamos la cadena JSON
                        'precio' => $linea['precio']
                        ]);

                       
                   
                }
                

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
                
                $stmt = $conn->prepare("SELECT * FROM pedido WHERE id=:id ");
                $stmt->execute(['id' => $id]);
                
                // Verificar qué registros se están obteniendo
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
                 
        
              if ($registro) {
                   
                    $fecha = date_create($registro->fecha_hora);
                    if (!$fecha) {
                        // Si la fecha no es válida, puedes usar un valor por defecto o lanzar un error
                        throw new Exception("Fecha inválida en el registro");
                    }
                    $pedido = new Pedido(
                        $registro->id,
                        $registro->usuario_id,
                        $fecha,
                        $registro->estado,
                        $registro->precio_total,
                        $registro->coordenada,
                        $registro->direccion
                    );

                    $stmtlineaPedido = $conn->prepare("SELECT * FROM linea_pedido WHERE pedido_id=:pedido_id");
                    $stmtlineaPedido->execute(['pedido_id' => $registro->id]);

                    $lineaPedidoArray = [];


                    
                        
                    while ($row = $stmtlineaPedido->fetch(PDO::FETCH_OBJ)) {
                    
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
                    
                    
                        
                        // Asignar el array de ingredientes al kebab
                    if (count($lineaPedidoArray) > 0) {
                        
                        $pedido->setLineasPedido($lineaPedidoArray); 
                        
                    }
                    
                    // Convertir el objeto a un array y añadirlo a la lista de usuarios
                    $pedidosArray[] = $pedido->toJson(); // Asegúrate de que el método toArray() esté definido
                    
        
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($pedido); // Aquí devuelves el pedidoen formato JSON
                    return $pedido;
                    exit; // Termina la ejecución aquí para evitar enviar múltiples respuestas

                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "No se encontró el pedido"]); 
                }

            } catch (PDOException $e) {
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
        public static function update($id, $pedido) {
            $conn = BdConnection::getConnection();
            
            try {

                $conn->beginTransaction();
                
                // Actualizar el pedido
                $stmt = $conn->prepare("
                                        UPDATE pedido
                                        SET usuario_id = :usuario_id, fecha_hora = :fecha_hora,
                                            estado = :estado, precio_total = :precio_total, direccion = :direccion
                                        WHERE id = :id
                                        ");
        
                $f = $pedido->getFecha_hora();
                $fechaStr = $f['date'];
                $fecha = new DateTime($fechaStr);
                $fechaSinMicrosegundos = $fecha->format('Y-m-d H:i:s');

        
                // Ejecutar la sentencia de actualización del pedido
                $stmt->execute([
                    'id' => $id,
                    'usuario_id' => $pedido->getUsuario_id(),
                    'fecha_hora' => $fechaSinMicrosegundos,
                    'estado' => $pedido->getEstado(),
                    'precio_total' => $pedido->getPrecio_total(),
                    'direccion' => $pedido->getDireccion()
                ]);
        
                // Actualizar las líneas de pedido
                

                $stmtDeleteRelations = $conn->prepare("DELETE FROM linea_pedido WHERE pedido_id = :pedido_id");
                $stmtDeleteRelations->execute(['pedido_id' => $id]);
        
                // Insertar nuevas relaciones
                $lineas = $pedido->getLineasPedido();
                
                
                if (!is_array($lineas)) {
                    throw new Exception("El método getLineasPedido() no devolvió un array.");
                }
        
                foreach ($lineas as $linea) {
                    
                    
                        
                        $pedidoId = $id;
                        //$lineaId = $linea['id'];
                        //error_log("Insertando relación: pedido_id = $pedidoId, linea_id = $lineaId");
                        
                                // Asegúrate de convertir 'kebabs' a JSON si es un array o un objeto
                        $kebabsJson = json_encode($linea['kebabs']);

                        // Preparar la sentencia SQL para insertar un nuevo pedido
                        $stmt = $conn->prepare("

                             INSERT INTO linea_pedido (pedido_id, cantidad, kebabs, precio)
                            VALUES (:pedido_id, :cantidad, :kebabs, :precio)
                        
                        ");

                        // Verificar si la conversión a JSON fue exitosa
                        if ($kebabsJson === false) {
                        // Manejar el error si no se pudo convertir 'kebabs' a JSON
                        echo json_encode(["error" => "Error al convertir kebabs a JSON"]);
                        exit;
                        }

                        // Ejecutar la sentencia, asignando valores de las propiedades del objeto lineaPedido
                        $stmt->execute([
                        'pedido_id' => $linea['pedido_id'],
                        'cantidad' => $linea['cantidad'],
                        'kebabs' => $kebabsJson,  // Pasamos la cadena JSON
                        'precio' => $linea['precio']
                        ]);

                       
                   
                }
                
                
                
                
        
        
                $conn->commit();
                return true;
        
            } catch (PDOException $e) {
                // Si ocurre algún error, revertir cambios
                $conn->rollBack();
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
                return false;
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
                $sql = "SELECT * FROM pedido ORDER BY fecha_hora ASC"; 
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute();
        
                $pedidosArray = []; // Array para almacenar los usuarios
               
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    
                    $fecha = date_create($row->fecha_hora);
                    $pedido = new Pedido(
                        $row->id, 
                        $row->usuario_id, 
                        $fecha,
                        $row->estado, 
                        $row->precio_total,
                        $row->direccion, 
                        $row->coordenada 
                        
                    );
                    
                    $stmtlineaPedido = $conn->prepare("SELECT * FROM linea_pedido WHERE pedido_id=:pedido_id ");
                    $stmtlineaPedido->execute(['pedido_id' => $row->id]);

                    $lineaPedidoArray = [];


                    
                        
                    while ($row = $stmtlineaPedido->fetch(PDO::FETCH_OBJ)) {
                    
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
                    
                    
                        
                        // Asignar el array de ingredientes al kebab
                    if (count($lineaPedidoArray) > 0) {
                        
                        $pedido->setLineasPedido($lineaPedidoArray); 
                        
                    }
                    
                    // Convertir el objeto a un array y añadirlo a la lista de usuarios
                    $pedidosArray[] = $pedido->toJson(); // Asegúrate de que el método toArray() esté definido
                
                    
                }

                 // Establecer la cabecera de tipo de contenido
                 header("Content-Type: application/json");
                 // Codificar el array de usuarios a JSON y devolverlo
                 echo json_encode($pedidosArray);
                //var_dump($pedidosArray);
                 exit; // Terminar el script después de enviar la respuesta

                 
            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
            
        }



        public static function getAllId($id)
        {
                // Obtener la conexión a la base de datos
                $conn = BdConnection::getConnection();
            
                
            try {  
                // Preparar la consulta
                $sql = "SELECT * FROM pedido WHERE usuario_id=:usuario_id ORDER BY fecha_hora ASC"; 
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute(['usuario_id' => $id->id]);
        
                $pedidosArray = []; // Array para almacenar los usuarios
               
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    
                    $fecha = date_create($row->fecha_hora);
                    $pedido = new Pedido(
                        $row->id, 
                        $row->usuario_id, 
                        $fecha,
                        $row->estado, 
                        $row->precio_total,
                        $row->direccion, 
                        $row->coordenada 
                        
                    );
                    
                    $stmtlineaPedido = $conn->prepare("SELECT * FROM linea_pedido WHERE pedido_id=:pedido_id ");
                    $stmtlineaPedido->execute(['pedido_id' => $row->id]);

                    $lineaPedidoArray = [];


                    
                        
                    while ($row = $stmtlineaPedido->fetch(PDO::FETCH_OBJ)) {
                    
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
                    
                    
                        
                        // Asignar el array de ingredientes al kebab
                    if (count($lineaPedidoArray) > 0) {
                        
                        $pedido->setLineasPedido($lineaPedidoArray); 
                        
                    }
                    
                    // Convertir el objeto a un array y añadirlo a la lista de usuarios
                    $pedidosArray[] = $pedido->toJson(); // Asegúrate de que el método toArray() esté definido
                
                    
                }

                 // Establecer la cabecera de tipo de contenido
                 header("Content-Type: application/json");
                 // Codificar el array de usuarios a JSON y devolverlo
                 echo json_encode($pedidosArray);
                //var_dump($pedidosArray);
                 exit; // Terminar el script después de enviar la respuesta

                 
            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
            
        }








    }