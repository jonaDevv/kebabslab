<?php

namespace Models;

class Usuario {
    private int $id;
    private string $nombre;
    private string $password;
    private Direccion $direccion;
    private string $rol;
    private float $monedero;
    private string $foto;
    private string $carrito;

    public function __construct(?int $id, string $nombre, string $password, Direccion $direccion, string $rol, float $monedero, string $foto, string $carrito) {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setPassword($password);
        $this->setDireccion($direccion); // Correcto
        $this->setRol($rol);
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
        $this->nombre = strtoupper($nombre);
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function setPassword($password): void {
        $this->password = $password;
    }

    public function getDireccion(): Direccion {
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
               $this->monedero . " " .
               $this->foto . " " .
               $this->carrito;
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'password' => $this->password,
            'direccion' => $this->direccion,
            'rol' => $this->rol,
            'monedero' => $this->monedero,
            'foto' => $this->foto,
            'carrito' => $this->carrito,
        ];
    }

    public function toJson(): string {
        return json_encode($this->toArray());
    }
}
