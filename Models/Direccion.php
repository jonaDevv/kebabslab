<?php
namespace Models;

Class Direccion{

   
     public ?int $id;
     public string $direccion;
     public ?string $cordenadas;
     public  ?int $usuario_id;

     public function __construct(?int $id,?int $usuario_id,string $direccion,?string $cordenadas=""){

         $this->setId($id);
         $this->setUsuario_id($usuario_id);          
         $this->setDireccion($direccion);
         $this->setCordenadas($cordenadas);

    }  

     public function getId():int
     {        
         return $this->id;
     }   
                         
     public function setId(?int $id):void
     {
         $this->id = $id;
     } 
     public function getDireccion(){
         return $this->direccion;
     }                        
     public function setDireccion($direccion):void{
         $this->direccion = $direccion;
     }                                                                 
     public function getCordenadas()
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
     public function setUsuario_id(?int $usuario_id):void
     {
          $this->usuario_id = $usuario_id;
    }



    public function __toString(): string {
        return $this->id . " " .
               $this->usuario_id. " " .
               $this->direccion. " " .
               $this->cordenadas ;
       
    }

    

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }
     
     









}               
