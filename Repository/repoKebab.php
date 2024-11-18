<?php

namespace Repository;
use Models\Ingrediente;
use Models\Alergeno;
use Models\Kebab;
use Models\BdConnection;
use PDO; // Importa PDO
use PDOException; 

Class repoKebab implements RepoCrud {
    
   

    // METODOS CRUD

    public static function create($kebab) {
        $conn = BdConnection::getConnection();

        try {
            // Iniciar la transacción
            $conn->beginTransaction();

            // Insertar el kebab
            $stmt = $conn->prepare("INSERT INTO kebab (nombre, precio, foto) 
                                    VALUES (:nombre, :precio, :foto)");
            $stmt->execute([
                'nombre' => $kebab->getNombre(),
                'precio' => $kebab->getPrecio(),
                'foto' => $kebab->getFoto(),
                
            ]);

            // Obtener el ID del nuevo kebab
            $kebabId = $conn->lastInsertId();

            // Insertar los ingredientes en la tabla intermedia
            $stmtIngrediente = $conn->prepare("INSERT INTO kebab_ingrediente (kebab_id, ingrediente_id) 
                                                VALUES (:kebab_id, :ingrediente_id)");

            foreach ($kebab->getIngredientes() as $ingrediente) {
                $stmtIngrediente->execute([
                    'kebab_id' => $kebabId,
                    'ingrediente_id' => $ingrediente['id'] // Usamos el ID del ingrediente
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
            // Primero, obtener el kebab por ID
            $stmt = $conn->prepare("SELECT * FROM kebab WHERE id = :id");
            $stmt->execute(['id' => $id]);
    
            // Recuperar el kebab
            $registro = $stmt->fetch(PDO::FETCH_OBJ);
    
            // Verificar si el kebab existe
            if (!$registro) {
                http_response_code(404);
                echo json_encode(["message" => "Kebab no encontrado"]);
                return null;
            }
    
            // Ahora, obtener los ingredientes asociados a este kebab
            $stmtIngredientes = $conn->prepare("
                SELECT i.* FROM ingrediente i
                INNER JOIN kebab_ingrediente ki ON i.id = ki.ingrediente_id
                WHERE ki.kebab_id = :kebab_id
            ");

            $stmtIngredientes->execute(['kebab_id' => $id]);
    
            // Crear un array para los ingredientes
            $ingredientesArray = [];
            while ($ingredienteRow = $stmtIngredientes->fetch(PDO::FETCH_OBJ)) {
                // Obtener los alérgenos asociados a cada ingrediente
                $stmtAlergenos = $conn->prepare("
                    

                    SELECT a.nombre FROM alergeno a
                    INNER JOIN ingrediente_alergeno ia ON a.id = ia.alergeno_id
                    WHERE ia.ingrediente_id = :ingrediente_id
                ");
                $stmtAlergenos->execute(['ingrediente_id' => $ingredienteRow->id]);
    
                // Crear un array para los alérgenos de este ingrediente
                $alergenosArray = [];
                while ($alergenoRow = $stmtAlergenos->fetch(PDO::FETCH_OBJ)) {
                    $alergenosArray[] = new Alergeno($alergenoRow->id, $alergenoRow->nombre, $alergenoRow->foto); // Asumimos que Alergeno tiene un constructor con id y nombre

                }
    
                // Crear el objeto Ingrediente con alérgenos
                $ingredientesArray[] = new Ingrediente(
                    $ingredienteRow->id,
                    $ingredienteRow->nombre,
                    $ingredienteRow->foto,
                    $ingredienteRow->precio,
                    $ingredienteRow->estado,
                    $alergenosArray // Incluir los alérgenos asociados
                ); 
            }
    
            // Crear el objeto kebab
            $kebab = new Kebab(
                $registro->id,
                $registro->nombre,
                $registro->foto,
                $registro->precio,
                $ingredientesArray // Pasar el array de ingredientes (que ahora incluye alérgenos)
            );
    
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($kebab); // Devuelve el kebab con ingredientes y alérgenos en formato JSON
            return $kebab;
    
        } catch (PDOException $e) {
            header('HTTP/1.1 500 Error en la base de datos');
            echo json_encode(["error" => $e->getMessage()]);
            return null;
        }
    }
    

    public static function update($id, $kebab) {
        // Asegurarse de que el objeto pasado es de tipo Kebab
        if (!$kebab instanceof Kebab) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(["error" => "Datos de kebab inválidos"]);
            return false; // Salir de la función
        }

        $conn = BdConnection::getConnection();

        try {
            // Iniciar una transacción
            $conn->beginTransaction();

            // 1. Actualizar los datos del kebab
            $stmtUpdate = $conn->prepare("UPDATE kebab SET nombre = :nombre, precio = :precio, foto = :foto WHERE id = :id");
            $stmtUpdate->execute([
                'id' => $id,
                'nombre' => $kebab->getNombre(),
                'precio' => $kebab->getPrecio(),
                'foto' => $kebab->getFoto(),
                
            ]);

            // 2. Actualizar las relaciones en la tabla intermedia
            // Eliminar relaciones existentes
            $stmtDeleteRelations = $conn->prepare("DELETE FROM kebab_ingrediente WHERE kebab_id = :kebab_id");
            $stmtDeleteRelations->execute(['kebab_id' => $id]);

            // Insertar las nuevas relaciones
            $ingredientes = $kebab->getIngredientes(); // Asegúrate de que esto devuelva un array de ids de ingredientes

            foreach ($ingredientes as $ingrediente) {
                if (is_object($ingrediente) && method_exists($ingrediente, 'getId')) {
                    $stmtInsertRelation = $conn->prepare("INSERT INTO kebab_ingrediente (kebab_id, ingrediente_id) VALUES (:kebab_id, :ingrediente_id)");
                    $stmtInsertRelation->execute([
                        'kebab_id' => $id,
                        'ingrediente_id' => $ingrediente->getId(),
                    ]);
                } else {
                    error_log("Ingrediente inválido encontrado: " . print_r($ingrediente, true));
                }
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
            // Preparar la sentencia SQL para eliminar el kebab
            $stmtDelete = $conn->prepare("DELETE FROM kebab WHERE id = :id");
            $stmtDelete->execute(['id' => $id]);

            // Verificar cuántas filas fueron afectadas
            if ($stmtDelete->rowCount() > 0) {
                return true; // Eliminar fue exitoso
            } else {
                return false; // No se encontró el kebab
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
            // Obtener todos los kebabs
            $stmt = $conn->prepare("SELECT * FROM kebab");
            $stmt->execute();

            $kebabsArray = [];

            while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {

                
                
                // Crear el objeto Kebab
                $kebab = new Kebab(
                    $row->id,
                    $row->nombre,
                    $row->foto,
                    $row->precio,
                   // Inicializamos el array de ingredientes vacío
                );
                

                // Ahora obtenemos los ingredientes para este kebab
                $stmtIngredientes = $conn->prepare("
                    SELECT i.* FROM ingrediente i
                    INNER JOIN kebab_ingrediente ki ON i.id = ki.ingrediente_id
                    WHERE ki.kebab_id = :kebab_id
                ");
                $stmtIngredientes->execute(['kebab_id' => $row->id]);

                // Crear el array de ingredientes
                $ingredientesArray = [];


                while ($ingredienteRow = $stmtIngredientes->fetch(PDO::FETCH_OBJ)) {
                    // Obtener los alérgenos asociados a cada ingrediente
                    $stmtAlergenos = $conn->prepare("
                        
    
                        SELECT a.* FROM alergeno a
                        INNER JOIN ingrediente_alergeno ia ON a.id = ia.alergeno_id
                        WHERE ia.ingrediente_id = :ingrediente_id
                    ");
                    $stmtAlergenos->execute(['ingrediente_id' => $ingredienteRow->id]);
        
                    // Crear un array para los alérgenos de este ingrediente
                    $alergenosArray = [];
                    
                    while ($alergenoRow = $stmtAlergenos->fetch(PDO::FETCH_OBJ)) {
                        
                        $alergenosArray[] = new Alergeno($alergenoRow->id, $alergenoRow->nombre, $alergenoRow->foto); // Asumimos que Alergeno tiene un constructor con id y nombre
                        




                    }
        
                    // Crear el objeto Ingrediente con alérgenos
                    $ingredientesArray[] = new Ingrediente(
                        $ingredienteRow->id,
                        $ingredienteRow->nombre,
                        $ingredienteRow->foto,
                        $ingredienteRow->precio,
                        $ingredienteRow->estado,
                        $alergenosArray // Incluir los alérgenos asociados
                    ); 
                }

                // Asignar el array de ingredientes al kebab
                if (count($ingredientesArray) > 0) {
                    $kebab->setIngredientes($ingredientesArray); // Asumimos que hay un método setIngredientes en la clase Kebab
                }

                

                // Agregar el kebab al array final
                $kebabsArray[] = $kebab->toJson();
            }

            header("Content-Type: application/json");
            echo json_encode($kebabsArray);
            exit;

        } catch (PDOException $e) {
            header('HTTP/1.1 500 Error en la base de datos');
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
