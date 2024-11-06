<?php
namespace Models;
use Models\Alergeno;

Class Ingrediente{

    public int $id;    
    public string $nombre;
    public string $foto;
    public float $precio;
    public string $estado;
    public array $alergenos;


    public function __construct(?int $id,string $nombre,string $foto,float $precio,string $estado,array $alergenos = []){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setFoto($foto);
        $this->setPrecio($precio);
        $this->setEstado($estado);
        $this->setAlergeno($alergenos);


    }

    public function getId():int
    {        
        return $this->id;
    }   
                            
    public function setId(?int $id):void
    {
        $this->id = $id;
    }

    public function getNombre():string
    {

        return $this->nombre;
    }

    public function setNombre($nombre):void
    {

        $this->nombre = strtoupper($nombre);


    }


        public function getFoto():string
    {

        return $this->foto;
    }

    public function setFoto($foto):void
    {

        $this->foto = $foto;


    }

        public function getPrecio():float
    {

        return $this->precio;
    }

    public function setPrecio($precio):void
    {

        $this->precio = $precio;


    }

        public function getEstado():string
    {

        return $this->estado;
    }

    public function setEstado($estado):void
    {

        $this->estado = $estado;


    }

        public function getAlergeno():array
    {

        return $this->alergenos;
    }

    public function setAlergeno($alergeno):void
    {

        $this->alergenos = $alergeno;


    }

    public function __toString(): string {
        return $this->id . " " .
               $this->nombre . " " .
               $this->foto . " " .
               $this->precio . " " .
               $this->estado . " " .
               $this->alergenos;
       
    }

   

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }

}
  
  
?>