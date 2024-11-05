<?php
namespace Models;

Class Kebab{

    private int $id;
    private string $nombre;
    private string $foto;        
    private float $precio;  


    public function __construct(int $id,string $nombre,string $foto,float $precio){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setFoto($foto);
        $this->setPrecio($precio);


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
}
  
    