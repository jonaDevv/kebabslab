<?php
namespace Models;

Class Alergeno{

    private int $id;
    private string $nombre;
    private string $foto;

    public function __construct(?int $id,string $nombre,string $foto){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setFoto($foto);


    }

    public function getId():int
    {        
        return $this->id;
    }   
                            
    public function setId(?int$id):void
    {
        $this->id = $id ?? 0;
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

        ];
    }

    public function toJson(): string {
        return json_encode($this->toArray());
    }

}
  
  
?>