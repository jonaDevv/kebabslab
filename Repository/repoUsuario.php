<?php


    namespace Repository;
    use Models\Usuario;
    use Models\Direccion;
    use Models\BdConnection;
    use Models\Alergeno;
    use PDO; // Importa PDO
    use PDOException; 
     

    Class repoUsuario implements RepoCrud{
        


        


        
        //METODOS CRUD

        public static function create($usuario) {
            // Asegurarse de que el objeto pasado es de tipo Usuario
            
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {

                $conn->beginTransaction();
                // Preparar la sentencia SQL para insertar un nuevo usuario
                $stmt = $conn->prepare("INSERT INTO usuario (nombre, password, rol,correo,monedero, foto, carrito) 
                                        VALUES (:nombre, :password, :rol, :correo, :monedero, :foto, :carrito)");
        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto usuario
                $resultado = $stmt->execute([
                    'nombre' => $usuario->getNombre(),
                    'password' => $usuario->getPassword(),
                    'rol' => $usuario->getRol(),
                    'correo' => $usuario->getCorreo(),
                    'monedero' => $usuario->getMonedero(),
                    'foto' => $usuario->getFoto(),
                    'carrito' => $usuario->getCarrito()
                ]);
                
                    // Obtener el ID del nuevo Usuario
                $UsuarioId = $conn->lastInsertId();

                if ($usuario->getDireccion()!=null){
                    // Convertir el array direccion en una cadena (separada por comas o espacios)
                    $direccionString = implode(", ", $usuario->getDireccion());

                    // Preparar la consulta SQL
                    $stmtDireccion = $conn->prepare("INSERT INTO direccion (direccion, usuario_id) VALUES (:direccion, :usuario_id)");

                    // Ejecutar la consulta con los parámetros
                    $stmtDireccion->execute([
                        'direccion' => $direccionString,
                        'usuario_id' => $UsuarioId
                    ]);
                }

                if ($usuario->getAlergia()!=null){
                    /// Insertar los alérgenos en la tabla intermedia
                    $stmtAlergeno = $conn->prepare("INSERT INTO usuario_has_alergenos (usuario_id, alergeno_id) 
                    VALUES (:usuario_id, :alergeno_id)");

                    foreach ($usuario->getAlergia() as $alergia) {
                        
                        $stmtAlergeno->execute([
                            'usuario_id' => $UsuarioId,
                            'alergeno_id' => $alergia['id'] // Accede directamente a 'id' si $alergeno es un array
                        ]);

                    }
                }
                 // Confirmar la transacción
                $conn->commit();
            
                // Verificar si la inserción fue exitosa
                if ($resultado) {
                    
                    return true;
                } else {
                    
                    return false;
                }
                
            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP
                $conn->rollBack();
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                return false;
            }
        }
        
        public static function read($id) { 

            $conn = BdConnection::getConnection();
            
            try {
                $conn->beginTransaction();

                $stmt = $conn->prepare("SELECT * FROM usuario WHERE id=:id");
                $stmt->execute(['id' => $id]);
                
                // Verificar qué registros se están obteniendo
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
                 // Depuración: Ver qué registro se obtiene
        
                if ($registro) {
                    $usuario = new Usuario(
                        $registro->id,
                        $registro->nombre,
                        $registro->password,
                        $registro->rol,
                        $registro->correo,
                        $registro->monedero,
                        $registro->foto,
                        $registro->carrito,
                       
                    );

                    $stmtDireccion = $conn->prepare("SELECT * FROM direccion WHERE usuario_id=:usuario_id");
                    $stmtDireccion->execute(['usuario_id' => $id]);

                    $direccionesArray = [];

                    while ($direccionRow = $stmtDireccion->fetch(PDO::FETCH_OBJ)) {
                        
                        $direccionesArray[] = new Direccion(
                            $direccionRow->id,
                            $direccionRow->nombre,
                            $direccionRow->cordenadas
                        );
                    }   
                        // Asignar el array de ingredientes al kebab
                    if (count($direccionesArray) > 0) {
                        $usuario->setDireccion($direccionesArray); // Asumimos que hay un método setIngredientes en la clase Kebab
                    }

                    
                    $stmtAlergenos = $conn->prepare("
                            SELECT a.* FROM alergeno a
                            INNER JOIN usuario_has_alergeno ua ON a.id = ua.alergeno_id
                            WHERE ua.usuario_id = :usuario_id
                    ");
                    $stmtAlergenos->execute(['usuario_id' => $id]);
                        
                    // Crear un array para los alérgenos
                    $alergenosArray = [];
                    while ($alergenoRow = $stmtAlergenos->fetch(PDO::FETCH_OBJ)) {
                        $alergenosArray[] = new Alergeno($alergenoRow->id, $alergenoRow->nombre, $alergenoRow->foto); // Asumimos que Alergeno tiene un constructor con id y nombre
                    }
                    
                        // Asignar el array de ingredientes al kebab
                    if (count($alergenosArray) > 0) {
                        $usuario->setAlergia($alergenosArray); // Asumimos que hay un método setIngredientes en la clase Kebab
                    }

                    

                    $conn->commit();

                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($usuario->toJson()); // Aquí devuelves el usuario en formato JSON
                    $conn->commit();
                    return $usuario;
                   
                    exit; // Termina la ejecución aquí para evitar enviar múltiples respuestas

                    
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "No se encontró el usuario"]);
                    return false; 
                }

                //  // Confirmar la transacción
            
                // //  // Verificar si la inserción fue exitosa
                //   if ($registro) {
                     
                    
                      
                //   } else {
                //     $conn->commit();
                      
                //  }


            } catch (PDOException $e) {
                $conn->rollBack();
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        
        

        
        public static function update($id, $usuario) {
            // Asegurarse de que el objeto pasado es de tipo Usuario
            if (!$usuario instanceof Usuario) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de usuario inválidos"]);
                return; // Salir de la función
            }
        
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();
        
            try {
                $conn->beginTransaction();

                // Preparar la sentencia SQL para actualizar un usuario existente
                $stmt = $conn->prepare("UPDATE usuario 
                                        SET nombre = :nombre, password = :password, 
                                            rol = :rol, correo =:correo, monedero = :monedero, foto = :foto, carrito = :carrito
                                        WHERE id = :id");
        
                // Ejecutar la sentencia, asignando valores de las propiedades del objeto usuario
                $resultado = $stmt->execute([
                    'id' => $id,  // Usa el parámetro $id para especificar el usuario a actualizar
                    'nombre' => $usuario->getNombre(),
                    'password' => $usuario->getPassword(),
                    'rol' => $usuario->getRol(),
                    'correo' => $usuario->getCorreo(),
                    'monedero' => $usuario->getMonedero(),
                    'foto' => $usuario->getFoto(),
                    'carrito' => $usuario->getCarrito(),
                   
                ]);

                if ($usuario->getAlergia()!=null){
                    /// Insertar los alérgenos en la tabla intermedia
                    $stmtAlergeno = $conn->prepare("INSERT INTO usuario_has_alergenos (usuario_id, alergeno_id) 
                    VALUES (:usuario_id, :alergeno_id)");

                    foreach ($usuario->getAlergia() as $alergia) {
                        
                        $stmtAlergeno->execute([
                            'usuario_id' => $id,
                            'alergeno_id' => $alergia['id'] // Accede directamente a 'id' si $alergeno es un array
                        ]);

                    }
                }

                header("Content-Type: application/json");

                // Verificar si la actualización fue exitosa
                if ($resultado) {
                   
                    $conn->commit();
                    return true;
                } else {
                    $conn->commit();
                    return false;
                }

               
                echo json_encode($usuario);


            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP
                $conn->rollBack();
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
            }
        }
        
        


        public static function delete($id) {

            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();

            try {

                $conn->beginTransaction();
                
                // Preparar la sentencia SQL para eliminar el usuario
                $stmt = $conn->prepare("DELETE FROM usuario WHERE id = :id");
                $stmt->execute(['id' => $id]);
                
               
                echo json_encode("Borrado");
                if ($stmt->rowCount() > 0) {
                    // Si se eliminó al menos un usuario, confirmar la transacción
                    $conn->commit();
                    return true;
                } else {
                    // Si no se eliminó ningún usuario (posiblemente porque no existe)
                    $conn->commit();
                    return false;
                }
                
            } catch (PDOException $e) {
                // Manejo de errores y respuesta de estado HTTP en caso de error
                $conn->rollBack();
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
                $sql = "SELECT * FROM usuario"; // Cambia "usuario" por el nombre de tu tabla
                $stmt = $conn->prepare($sql);
        
                // Ejecutar la consulta
                $stmt->execute();
        
                $usuariosArray = []; // Array para almacenar los usuarios
               
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    // Crear un nuevo objeto $usuario
                    $usuario = new Usuario(
                        $row->id, 
                        $row->nombre, 
                        $row->password, 
                        $row->rol, 
                        $row->correo, 
                        $row->monedero, 
                        $row->foto, 
                        $row->carrito,
                        );
                    
                    $stmtDireccion = $conn->prepare("SELECT * FROM direccion WHERE usuario_id=:usuario_id");
                    $stmtDireccion->execute(['usuario_id' => $row->id]);

                    $direccionesArray = [];
                        
                    while ($direccionRow = $stmtDireccion->fetch(PDO::FETCH_OBJ)) {
                        // Verifica que las propiedades existen antes de usarlas
                        $nombre = isset($direccionRow->nombre) ? $direccionRow->nombre : 'Nombre no disponible';
                        $cordenadas = isset($direccionRow->cordenadas) ? $direccionRow->cordenadas : 'Cordenadas no disponibles';

                        // Crear la instancia de Direccion con las propiedades validadas
                        $direccionesArray[] = new Direccion(
                            $direccionRow->id,
                            $nombre,
                            $cordenadas
                        );
                    }
                        
                    if (count($direccionesArray) > 0) {
                        $usuario->setDireccion($direccionesArray); // Asumimos que hay un método setIngredientes en la clase Kebab
                    }

                    //Ahora buscamos los alergenos
                    $stmtAlergenos = $conn->prepare("
                            SELECT a.* FROM alergeno a
                            INNER JOIN usuario_has_alergeno ua ON a.id = ua.alergeno_id
                            WHERE ua.usuario_id = :usuario_id
                    ");

                    $stmtAlergenos->execute(['usuario_id' => $usuario->getId()]);
                        
                    // Crear un array para los alérgenos
                    $alergenosArray = [];

                    while ($alergenoRow = $stmtAlergenos->fetch(PDO::FETCH_OBJ)) {
                        $alergenosArray[] = new Alergeno($alergenoRow->id, $alergenoRow->nombre, $alergenoRow->foto); // Asumimos que Alergeno tiene un constructor con id y nombre
                    }
                    
                        // Asignar el array de ingredientes al kebab
                    if (count($alergenosArray) > 0) {
                        $usuario->setAlergia($alergenosArray); // Asumimos que hay un método setIngredientes en la clase Kebab
                    }
                     
                    
                    
                    // Convertir el objeto a un array y añadirlo a la lista de usuarios
                    $usuariosArray[] = $usuario->toJson(); // Asegúrate de que el método toArray() esté definido
                }
                
        
                // Establecer la cabecera de tipo de contenido
                header("Content-Type: application/json");
                // Codificar el array de usuarios a JSON y devolverlo
                echo json_encode($usuariosArray);
                exit; // Terminar el script después de enviar la respuesta
                
                
            } catch (PDOException $e) {
                
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        }








    }