<?php
namespace Models;

Class Direccion{

   
     private int $id;
     private string $localidad;
     private string $provincia;
     private string $cordenadas;
     private  $usuario_id;

     public function __construct(int $id,string $localidad,string $provincia,string $cordenadas,string $usuario_id){

         $this->setId($id);
         $this->setLocalidad($localidad);
         $this->setProvincia($provincia);
         $this->setCordenadas($cordenadas);
         $this->setUsuario_id($usuario_id);          

 }  

     public function getId():int
     {        
         return $this->id;
     }   
                         
     public function setId($id):void
     {
         $this->id = $id;
     }                           
     public function getLocalidad():string
     {
         return $this->localidad;
     }                           
     public function setLocalidad($localidad):void
     {
         $this->localidad = $localidad;
     }
     public function getProvincia():string
     {
         return $this->provincia;
     }
     public function setProvincia($provincia):void
     {
         $this->provincia = $provincia;
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

}               
