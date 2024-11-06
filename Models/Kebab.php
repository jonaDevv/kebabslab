<?php
namespace Models;
use Models\Ingrediente;

Class Kebab{

    public int $id;
    public string $nombre;
    public string $foto;        
    public float $precio;
    public array $ingredientes;


    public function __construct(int $id,string $nombre,string $foto,float $precio,array $ingredientes){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setFoto($foto);
        $this->setPrecio($precio);
        $this->setIngredientes($ingredientes);


    }

    public function getId():int
    {        
        return $this->id;
    }   

    public function setId($id):void
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

        public function getIngredientes():array
    {

        return $this->ingredientes;
    }

    public function setIngredientes($ingredientes):void
    {

        $this->ingredientes = $ingredientes;


    }

    

    public function __toString(): string {
        return $this->id . " " .
               $this->nombre . " " .
               $this->foto . " " .
               $this->precio . " " .               
               $this->ingredientes; 
    }

   

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }
}
  
    