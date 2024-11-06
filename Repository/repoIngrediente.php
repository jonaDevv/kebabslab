<?php


    namespace Repository;
    use Models\Ingrediente;
    use Models\Alergeno;
    use Models\BdConnection;
    use PDO; // Importa PDO
    use PDOException; 
     

    Class repoIngrediente implements RepoCrud{
        
        private static $listaIngredientes = []; // Array para almacenar los ingredientes

        
        //METODOS CRUD

        public static function create($ingrediente) {
            $conn = BdConnection::getConnection();
        
            try {
                // Iniciar la transacción
                $conn->beginTransaction();
        
                // Insertar el ingrediente
                $stmt = $conn->prepare("INSERT INTO ingrediente (nombre, precio, foto, estado) 
                                        VALUES (:nombre, :precio, :foto, :estado)");
                $stmt->execute([
                    'nombre' => $ingrediente->getNombre(),
                    'precio' => $ingrediente->getPrecio(),
                    'foto' => $ingrediente->getFoto(),
                    'estado' => $ingrediente->getEstado()
                ]);
        
                // Obtener el ID del nuevo ingrediente
                $ingredienteId = $conn->lastInsertId();
        
                // Insertar los alérgenos en la tabla intermedia
                $stmtAlergeno = $conn->prepare("INSERT INTO ingrediente_alergeno (ingrediente_id, alergeno_id) 
                                                VALUES (:ingrediente_id, :alergeno_id)");
        
                foreach ($ingrediente->getAlergenos() as $alergeno) {
                    $stmtAlergeno->execute([
                        'ingrediente_id' => $ingredienteId,
                        'alergeno_id' => $alergeno->getId() // Asegúrate de que Alergeno tiene el método getId()
                    ]);
                }
        
                // Confirmar la transacción
                $conn->commit();
                return true;
        
            } catch (PDOException $e) {
                // Revertir la transacción en caso de error
                $conn->rollBack();
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                return false;
            }
        }
        
        
        public static function read($id) {
            $conn = BdConnection::getConnection();
            
            try {
                // Primero, obtener el ingrediente por ID
                $stmt = $conn->prepare("SELECT * FROM ingrediente WHERE id = :id");
                $stmt->execute(['id' => $id]);
                
                // Recuperar el ingrediente
                $registro = $stmt->fetch(PDO::FETCH_OBJ);
        
                // Verificar si el ingrediente existe
                if (!$registro) {
                    http_response_code(404);
                    echo json_encode(["message" => "Ingrediente no encontrado"]);
                    return null;
                }
        
                // Ahora, obtener los alérgenos asociados a este ingrediente
                $stmtAlergenos = $conn->prepare("
                    SELECT a.* FROM alergeno a
                    INNER JOIN ingrediente_alergeno ia ON a.id = ia.alergeno_id
                    WHERE ia.ingrediente_id = :ingrediente_id
                ");
                $stmtAlergenos->execute(['ingrediente_id' => $id]);
                
                // Crear un array para los alérgenos
                $alergenosArray = [];
                while ($alergenoRow = $stmtAlergenos->fetch(PDO::FETCH_OBJ)) {
                    $alergenosArray[] = new Alergeno($alergenoRow->id, $alergenoRow->nombre, $alergenoRow->foto); // Asumimos que Alergeno tiene un constructor con id y nombre
                }
        
                // Crear el objeto ingrediente
                $ingrediente = new Ingrediente(
                    $registro->id,
                    $registro->nombre,
                    $registro->foto,
                    $registro->precio,
                    $registro->estado,
                    $alergenosArray // Pasar el array de alérgenos
                );
        
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($ingrediente); // Devuelve el ingrediente con alérgenos en formato JSON
                return $ingrediente;
        
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                return null;
            }
        }
        
        
        
        

        
        public static function update($id, $ingrediente) {
            // Asegurarse de que el objeto pasado es de tipo Ingrediente
            if (!$ingrediente instanceof Ingrediente) {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(["error" => "Datos de ingrediente inválidos"]);
                return false; // Salir de la función
            }
        
            $conn = BdConnection::getConnection();
        
            try {
                // Iniciar una transacción
                $conn->beginTransaction();
        
                // 1. Actualizar los datos del ingrediente
                $stmtUpdate = $conn->prepare("UPDATE ingredientes SET nombre = :nombre, precio = :precio, foto = :foto, estado = :estado WHERE id = :id");
                $stmtUpdate->execute([
                    'id' => $id,
                    'nombre' => $ingrediente->getNombre(),
                    'precio' => $ingrediente->getPrecio(),
                    'foto' => $ingrediente->getFoto(),
                    'estado' => $ingrediente->getEstado(),
                ]);
        
                // 2. Actualizar las relaciones en la tabla intermedia
                // Eliminar relaciones existentes
                $stmtDeleteRelations = $conn->prepare("DELETE FROM ingredientes_alergeno WHERE ingrediente_id = :ingrediente_id");
                $stmtDeleteRelations->execute(['ingrediente_id' => $id]);
        
                // Insertar las nuevas relaciones
                $alergenos = $ingrediente->getAlergeno(); // Asegúrate de que esto devuelva un array de ids de alérgenos
        
                foreach ($alergenos as $alergenoId) {
                    $stmtInsertRelation = $conn->prepare("INSERT INTO ingredientes_alergeno (ingrediente_id, alergeno_id) VALUES (:ingrediente_id, :alergeno_id)");
                    $stmtInsertRelation->execute([
                        'ingrediente_id' => $id,
                        'alergeno_id' => $alergenoId,
                    ]);
                }
        
                // Confirmar la transacción
                $conn->commit();
                return true; // La actualización fue exitosa
            } catch (PDOException $e) {
                // Revertir la transacción en caso de error
                $conn->rollBack();
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                return false;
            }
        }
        
        
        
        


        public static function delete($id) {
            $conn = BdConnection::getConnection();
        
            try {
                // Preparar la sentencia SQL para eliminar el ingrediente
                $stmtDelete = $conn->prepare("DELETE FROM ingredientes WHERE id = :id");
                $stmtDelete->execute(['id' => $id]);
        
                // Verificar cuántas filas fueron afectadas
                if ($stmtDelete->rowCount() > 0) {
                    return true; // Eliminar fue exitoso
                } else {
                    return false; // No se encontró el ingrediente
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
                return false;
            }
        }
        
        
         
        
        public static function getAll() {
            $conn = BdConnection::getConnection();
            
            try {
                // Obtener todos los ingredientes
                $stmt = $conn->prepare("SELECT * FROM ingrediente");
                $stmt->execute();
                
                $ingredientesArray = [];
        
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    // Crear el objeto Ingrediente
                    $ingrediente = new Ingrediente(
                        $row->id,
                        $row->nombre,
                        $row->foto,
                        $row->precio,
                        $row->estado,
                         // Inicializamos el array de alérgenos vacío
                    );
        
                    // Ahora obtenemos los alérgenos para este ingrediente
                    $stmtAlergenos = $conn->prepare("
                        SELECT a.* FROM alergeno a
                        INNER JOIN ingrediente_alergeno ia ON a.id = ia.alergeno_id
                        WHERE ia.ingrediente_id = :ingrediente_id
                    ");
                    $stmtAlergenos->execute(['ingrediente_id' => $row->id]);
        
                    // Crear el array de alérgenos
                    $alergenosArray = [];
                    while ($alergenoRow = $stmtAlergenos->fetch(PDO::FETCH_OBJ)) {
                        $alergenosArray[] = new Alergeno($alergenoRow->id, $alergenoRow->nombre, $alergenoRow->foto); // Asumimos que Alergeno tiene un constructor con id y nombre
                    }
        
                    // Asignar el array de alérgenos al ingrediente
                    if (count($alergenosArray) > 0) {
                        $ingrediente->setAlergeno($alergenosArray); // Asumimos que hay un método setAlergeno en la clase Ingrediente
                    }
                    $ingrediente->setAlergeno($alergenosArray); // Asumimos que hay un método setAlergeno en la clase Ingrediente
        
                    // Agregar el ingrediente al array final
                    $ingredientesArray[] = $ingrediente->toJson();
                }
        
                header("Content-Type: application/json");
                echo json_encode($ingredientesArray);
                exit;
        
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error en la base de datos');
                echo json_encode(["error" => $e->getMessage()]);
            }
        }
        








    }