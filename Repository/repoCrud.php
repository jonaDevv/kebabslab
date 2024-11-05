<?php


    namespace Repository;

    interface RepoCrud{

        public static function create($o);

        public static function read($id);

        public static function update($id,$o);

        public static function delete($id);      
          
        public static function getAll();

    
    
    }

    