<?php
namespace Models;

use DateTime;


Class Pedido{
            
    

    public int $id;
    public int $usuario_id;                        
    public DateTime $fecha_hora;
    public array $lineasPedido;
    public string $estado;
    public float $precio_total;
    public Direccion $direccion;
    public string $coordenada; //Point en formato WKT
    
    public function __construct(int $id,int $usuario_id,DateTime $fecha_hora,array $lineaPedido, string $estado,float $precio_total,string $direccion,string $coordenada=""){
        
        $this->setId($id);
        $this->setUsuario_id($usuario_id);          
        $this->setFecha_hora($fecha_hora);
        $this->setLineasPedido($lineaPedido);
        $this->setEstado($estado);
        $this->setPrecio_total($precio_total);
        $this->setCoordenada($coordenada);
        $this->setDireccion($direccion);

}  

    public function getId():int
    {        
        return $this->id;
    }   
                            
    public function setId($id):void
    {
        $this->id = $id;
    }                           
    public function getFecha_hora():DateTime    
    {
        return $this->fecha_hora;
    }                           
    public function setFecha_hora($fecha_hora):void
    {
        $this->fecha_hora = $fecha_hora;
    }
    public function getEstado():string
    {
        return $this->estado;
    }
    public function setEstado($estado):void
    {
        $this->estado = $estado;
    }
    public function getLineasPedido():array
    {
        return $this->lineasPedido;
    }
    public function setLineasPedido($lineasPedido):void
    {
        $this->lineasPedido = $lineasPedido;
    }
    public function getPrecio_total():float
    {
        return $this->precio_total;
    }
    public function setPrecio_total($precio_total):void
    {
        $this->precio_total = $precio_total;
    }
    public function getCoordenada():string
    {
        return $this->coordenada;
    }
    public function setCoordenada($coordenada):void
    {
        $this->coordenada = $coordenada;
    }
    public function getDireccion():Direccion
    {
        return $this->direccion;
    }
    public function setDireccion($direccion):void
    {
        $this->direccion = $direccion;
    }
    public function getUsuario_id():int
    {
        return $this->usuario_id;
    }
    public function setUsuario_id($usuario_id):void
    {
        $this->usuario_id = $usuario_id;
    }   
    
    

    public function __toString(): string {
        return $this->id . " " .
               $this->usuario_id. " " .
               $this->fecha_hora . " " .
               $this->lineasPedido . " " .
               $this->estado . " " .
               $this->precio_total . " " .
               $this->coordenada . " " .
               $this->direccion;
    }

   

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }

}