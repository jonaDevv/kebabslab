<?php
namespace Models;
use Models\Ingrediente;

Class Kebab{

    private int $id;
    private string $nombre;
    private string $foto;        
    private float $precio;
    private Ingrediente $ingredientes;


    public function __construct(int $id,string $nombre,string $foto,float $precio,Ingrediente $ingredientes){

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

        public function getIngredientes():Ingrediente
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
               $this->foto;
       
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'foto' => $this->foto,
            'precio' => $this->precio,
            'ingredientes' => $this->ingredientes->toArray(),

        ];
    }

    public function toJson(): string {
        return json_encode($this->toArray());
    }
}
  
    