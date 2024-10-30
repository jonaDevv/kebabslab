<?php
namespace App\Models;

Class Usuario{

    private int $id;
    private string $nombre;
    private string $password;
    private string $telefono;
    private string $direccion;
    private string $rool;
    private float $monedero;
    private string $foto;
    private string $carrito;
   
  
    public function __construct(int $id,string $nombre,string $password,string $telefono,string $direccion,string $rool,float $monedero,string $foto,string $carrito){

        $this->setId($id);
        $this->setNombre($nombre);
        $this->setPassword($password);
        $this->setTelefono($telefono);
        $this->setDireccion($direccion);
        $this->setRool($rool);
        $this->setMonedero($monedero);
        $this->setFoto($foto);
        $this->setCarrito($carrito);        
        

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

    public function getPassword():string
    {

        return $this->password;
    }

    public function setPassword($password):void
    {

        $this->password = $password;


    }

    public function getTelefono():string
    {

        return $this->telefono;
    }

    public function setTelefono($telefono):void
    {

        $this->password = $telefono;


    }


        public function getDireccion():string
    {

        return $this->direccion;
    }

    public function setDireccion($direccion):void
    {

        $this->password = $direccion;


    }

    public function getRool():string
    {

        return $this->rool;
    }

    public function setRool($rool):void
    {

        $this->password = $rool;


    }

    public function getMonedero():float
    {

        return $this->monedero;
    }

    public function setMonedero($monedero):void
    {

        $this->password = $monedero;


    }

    public function getFoto():string
    {

        return $this->foto;
    }

    public function setFoto($foto):void
    {

        $this->password = $foto;


    }

    public function getCarrito():string
    {

        return $this->carrito;
    }

    public function setCarrito($carrito):void
    {

        $this->password = $carrito;


    }   

    






}

