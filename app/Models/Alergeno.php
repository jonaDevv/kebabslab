<?php
namespace App\Models;

Class Alergeno{

    private int $id;
    private string $nombre;
    private string $foto;

    public function __construct(int $id,string $nombre,string $foto){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setFoto($foto);


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

}
  
  
?>