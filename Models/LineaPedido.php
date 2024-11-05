<?php
namespace Models;

Class LineaPedido{
   
    private int $id;
    private string $kebabs;
    private int $cantidad;
    private float $precio;
    private int $pedido_id;

    public function __construct(int $id,string $kebabs,int $cantidad,float $precio,int $pedido_id){

        $this->setId($id);
        $this->setKebabs($kebabs);
        $this->setCantidad($cantidad);
        $this->setPrecio($precio);              
        $this->setPedido_id($pedido_id);    
        





    }
    
    public function getId():int
    {        
        return $this->id;
    }   
                            
    public function setId($id):void
    {
        $this->id = $id;
    }

    public function getKebabs():string
    {

        return $this->kebabs;
    }

    public function setKebabs($kebabs):void
    {

        $this->kebabs = strtoupper($kebabs);


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

   
    
}

    
