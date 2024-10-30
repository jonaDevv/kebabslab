<?php


    namespace App\Repository;

    interface RepoCrud{

        public static function create($o);

        public static function read($id):?object;

        public static function update($id,$o):bool;

        public static function delete($id):bool;      
          
        public static function getAll():array;

    
    
    }

    