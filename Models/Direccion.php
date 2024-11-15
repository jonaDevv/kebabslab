<?php
namespace Models;

Class Direccion{

   
     public int $id;
     public string $nombre;
     public string $cordenadas;
     public  int $usuario_id;

     public function __construct(?int $id,int $usuario_id,string $nombre,string $cordenadas=""){

         $this->setId($id);
         $this->setNombre($nombre);
         $this->setCordenadas($cordenadas);
         $this->setUsuario_id($usuario_id);          

    }  

     public function getId():int
     {        
         return $this->id;
     }   
                         
     public function setId(?int $id):void
     {
         $this->id = $id;
     } 
     public function getNombre():string{
         return $this->nombre;
     }                        
     public function setNombre($nombre):void{
         $this->nombre = $nombre;
     }                                                                 
     public function getCordenadas():string
     {
         return $this->cordenadas;
     }
     public function setCordenadas($cordenadas):void
     {
         $this->cordenadas = $cordenadas;
     }
      public function getUsuario_id():string
      {
          return $this->usuario_id;
     }
     public function setUsuario_id($usuario_id):void
     {
          $this->usuario_id = $usuario_id;
    }



    public function __toString(): string {
        return $this->id . " " .
               $this->nombre . " " .
               $this->cordenadas ;
               $this->usuario_id;
       
    }

    

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }
     
     









}               
