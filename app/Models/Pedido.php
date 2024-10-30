
<?php
namespace App\Models;

use DateTime;

Class Pedido{

    /**id int AI PK
    fecha_hora datetime
    estado enum('recibido','preparacion','camino','entregado')
    precio_total decimal(10,2)
    coordenada point
    direccion varchar(300)
    usuario_id int"*/

    //Falta la linea de pedido?             
    

    private int $id;
    private DateTime $fecha_hora;
    private string $estado;
    private float $precio_total;
    private string $coordenada; //Point en formato WKT
    private string $direccion;
    private int $usuario_id;                        
    
    public function __construct(int $id,DateTime $fecha_hora,string $estado,float $precio_total,string $coordenada,string $direccion,int $usuario_id){
        
        $this->setId($id);
        $this->setFecha_hora($fecha_hora);
        $this->setEstado($estado);
        $this->setPrecio_total($precio_total);
        $this->setCoordenada($coordenada);
        $this->setDireccion($direccion);
        $this->setUsuario_id($usuario_id);          

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
    public function getDireccion():string
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

}