<?php
namespace Models;

Class LineaPedido{
   
    public ?int $id;
    public $kebabs;
    public int $cantidad;
    public float $precio;
    public int $pedido_id;

    public function __construct(?int $id,int $pedido_id,int $cantidad,$kebabs,float $precio){

        $this->setId($id);
        $this->setPedido_id($pedido_id); 
        $this->setKebabs($kebabs);
        $this->setCantidad($cantidad);
        $this->setPrecio($precio);              

        
    }
    
    public function getId():int
    {        
        return $this->id;
    }   
                            
    public function setId(?int $id):void
    {
        $this->id = $id;
    }

    public function getKebabs()
    {
    

    return $this->kebabs; // Devolver como string si falla la decodificación
    }

    public function setKebabs($kebabs):void
    {
        

        $this->kebabs = $kebabs;


    }

        public function getCantidad():int
    {

        return $this->cantidad;
    }

    public function setCantidad($cantidad):void
    {

        $this->cantidad = $cantidad;


    }

        public function getPrecio():float
    {

        return $this->precio;
    }

    public function setPrecio($precio):void
    {

        $this->precio = $precio;


    }

        public function getPedido_id():int
    {

        return $this->pedido_id;
    }

    public function setPedido_id($pedido_id):void
    {

        $this->pedido_id = $pedido_id;


    }

    public function __toString(): string {
        return $this->id . " " .
               $this->kebabs . " " .
               $this->cantidad . " " .
               $this->precio . " " .
               $this->pedido_id;
       
    }

   

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }

   
    
}

    
