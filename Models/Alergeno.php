<?php
namespace Models;

Class Alergeno{

    public int $id;
    public string $nombre;
    public string $foto;

    public function __construct(?int $id,string $nombre,string $foto){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setFoto($foto);


    }

    public function getId():int
    {        
        return $this->id;
    }   
                            
    public function setId(?int $id):void
    {
        $this->id = $id ?? 0;
    }

    public function getNombre():string
    {

        return $this->nombre;
    }

    public function setNombre($nombre):void
    {

        $this->nombre = ucfirst($nombre);


    }


        public function getFoto():string
    {

        return $this->foto;
    }

    public function setFoto($foto):void
    {

        $this->foto = $foto;


    }

    public function __toString(): string {
        return $this->id . " " .
               $this->nombre . " " .
               $this->foto;
       
    }

    // public function toArray(): array {
    //     return [
    //         'id' => $this->id,
    //         'nombre' => $this->nombre,
    //         'foto' => $this->foto,

    //     ];
    // }

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }
}
  
  
?>