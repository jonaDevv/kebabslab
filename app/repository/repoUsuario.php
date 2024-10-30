<?php
   
     use App\Models\Usuario;

    Class repoUsuario implements RepoCrud{
        


        private static $listaUsuarios = [];


        
        //METODOS CRUD

        public static function create($usuario){


            

            self::$listaUsuarios[] = $usuario;
            
            
        }

        public static function read($id): ? Usuario { 
           // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();

            $stmt=$conn->prepare("select * from usuario where id= :id");
            $stmt->execute(['id'=>$id]);
            $usuario=null;
            $registro = $stmt->fetch(PDO::FETCH_OBJ);

            if($registro){

                
                
                $usuario = new$usuario($registro->id,$registro->marca,$registro->modelo);
                

                
            
            }

            return $usuario;
        }
        

        
        public static function update($id, $usuario): bool {
            foreach (self::$listaUsuarios as $index => $usuario) {
                if ($usuario->getId() === $id) { // Compara el ID del$usuario
                    self::$listaUsuarios[$index] = $usuario; // Actualiza el$usuario en la lista
                    return true; // Retorna true si se actualizó correctamente
                }
            }
            return false; // Retorna false si no se encontró el$usuario
        }
        


        public static function delete($id): bool {
            
            try{
            
                $conn = BdConnection::getConnection();

                $stmt=$conn->prepare("DELETE from usuario where id= :id");
                $stmt->execute(['id'=>$id]);
                $registro = $stmt->fetch();

                return $registro;

            }catch (PDOException $e) {
                // Manejo de errores de conexión
                die("Error en la conexión: " . $e->getMessage());
            }

            
        }
         
        
        public static function getAll():array
        {

                       
            // Obtener la conexión a la base de datos
            $conn = BdConnection::getConnection();

            // Preparar la consulta
            $sql = "SELECT * FROM usuario"; // Cambia $usuario" por el nombre de tu tabla
            $stmt = $conn->prepare($sql);

            // Ejecutar la consulta
            $stmt->execute();

            // Usar fetch con FETCH_OBJ para obtener objetos
            while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                // Crear un nuevo objeto$usuario y agregarlo a la lista
                $usuario = new Usuario($row->id, $row->nombre, $row->password, $row->telefono, $row->direccion, $row->rool, $row->monedero, $row->foto, $row->carrito);
                self::$listaUsuarios[] = $usuario; // Añadir a la lista de$usuarios
            }


            return self::$listaUsuarios;
        }








    }