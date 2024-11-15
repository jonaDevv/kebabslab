<?php

namespace Models;

class Usuario {

    public int $id;
    public string $nombre;
    public string $password;
    public string $rol;
    public string $correo;
    public float $monedero;
    public  $foto;
    public  $carrito;
    public array $alergia;
    public array  $direccion;
    

    public function __construct(?int $id, string $nombre, string $password, string $rol,string $correo, float $monedero=0.0, $foto="", $carrito="", array $alergia = [], array $direccion = []) {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setPassword($password);
        $this->setRol($rol);
        $this->setCorreo($correo);
        $this->setMonedero($monedero);
        $this->setFoto($foto);
        $this->setCarrito($carrito);
        $this->setAlergia($alergia);
        $this->setDireccion($direccion); // Correcto
    }

    public function getId(): int {
        return $this->id;
    }

    public function setId(?int $id){
        $this->id = $id ?? 0;// Correcto
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = ucfirst($nombre);
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getAlergia(): array{
        return $this->alergia;
    }

    public function setAlergia($alergia) {
        $this->alergia = $alergia; // Corrige la propiedad aquí
    }

    public function getDireccion(): array{
        return $this->direccion;
    }

    public function setDireccion($direccion) {
        $this->direccion = $direccion; // Corrige la propiedad aquí
    }

    public function getRol(): string {
        return $this->rol;
    }

    public function setRol($rol) {
        $this->rol = $rol; // Corrige la propiedad aquí
    }

    public function getCorreo(): string {
        return $this->correo;
    }

    public function setCorreo($correo) {
        $this->correo = $correo; // Corrige la propiedad aquí
    }

    public function getMonedero(): float {
        return $this->monedero;
    }

    public function setMonedero($monedero) {
        $this->monedero = $monedero; // Corrige la propiedad aquí
    }

    public function getFoto(){
        return $this->foto;
    }

    public function setFoto($foto) {
        $this->foto = $foto; // Corrige la propiedad aquí
    }

    public function getCarrito(){
        return $this->carrito;
    }

    public function setCarrito($carrito) {
        $this->carrito = $carrito; // Corrige la propiedad aquí
    }

    public function __toString(): string {
        return $this->id . " " .
               $this->nombre . " " .
               $this->password . " " .
               $this->correo . " " .
               $this->rol . " " .
               $this->monedero . " " .
               $this->foto . " " .
               $this->carrito . " " .
               $this->alergia . " " .
               $this->direccion;
    }

    
   

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }
}
