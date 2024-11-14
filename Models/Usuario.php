<?php

namespace Models;

class Usuario {
    private int $id;
    private string $nombre;
    private string $password;
    private array$direccion;
    private string $rol;
    private string $correo;
    private float $monedero;
    private string $foto;
    private string $carrito;

    public function __construct(?int $id, string $nombre, string $password, array $direccion, string $rol,string $correo, float $monedero, string $foto, string $carrito) {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setPassword($password);
        $this->setDireccion($direccion); // Correcto
        $this->setRol($rol);
        $this->setCorreo($correo);
        $this->setMonedero($monedero);
        $this->setFoto($foto);
        $this->setCarrito($carrito);
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

    public function setNombre($nombre): void {
        $this->nombre = ucfirst($nombre);
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function setPassword($password): void {
        $this->password = $password;
    }

    public function getDireccion(): array{
        return $this->direccion;
    }

    public function setDireccion($direccion): void {
        $this->direccion = $direccion; // Corrige la propiedad aquí
    }

    public function getRol(): string {
        return $this->rol;
    }

    public function setRol($rol): void {
        $this->rol = $rol; // Corrige la propiedad aquí
    }

    public function getCorreo(): string {
        return $this->correo;
    }

    public function setCorreo($correo): void {
        $this->correo = $correo; // Corrige la propiedad aquí
    }

    public function getMonedero(): float {
        return $this->monedero;
    }

    public function setMonedero($monedero): void {
        $this->monedero = $monedero; // Corrige la propiedad aquí
    }

    public function getFoto(): string {
        return $this->foto;
    }

    public function setFoto($foto): void {
        $this->foto = $foto; // Corrige la propiedad aquí
    }

    public function getCarrito(): string {
        return $this->carrito;
    }

    public function setCarrito($carrito): void {
        $this->carrito = $carrito; // Corrige la propiedad aquí
    }

    public function __toString(): string {
        return $this->id . " " .
               $this->nombre . " " .
               $this->password . " " .
               $this->direccion . " " .
               $this->rol . " " .
               $this->correo . " " .
               $this->monedero . " " .
               $this->foto . " " .
               $this->carrito;
    }

    
   

    public function toJson() {
        return get_object_vars($this); // Convierte todas las propiedades públicas en un array
    }
}
