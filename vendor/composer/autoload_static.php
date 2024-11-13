<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9dbb8d27343757572a72f7e813afd380
{
    public static $prefixLengthsPsr4 = array (
        'V' => 
        array (
            'Vistas\\' => 7,
        ),
        'R' => 
        array (
            'Repository\\' => 11,
        ),
        'M' => 
        array (
            'Models\\' => 7,
        ),
        'L' => 
        array (
            'League\\Plates\\' => 14,
        ),
        'H' => 
        array (
            'Helper\\' => 7,
        ),
        'C' => 
        array (
            'Controllers\\' => 12,
        ),
        'A' => 
        array (
            'AutoCargador\\' => 13,
            'Api\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Vistas\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Vistas',
        ),
        'Repository\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Repository',
        ),
        'Models\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Models',
        ),
        'League\\Plates\\' => 
        array (
            0 => __DIR__ . '/..' . '/league/plates/src',
        ),
        'Helper\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Helper',
        ),
        'Controllers\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Controllers',
        ),
        'AutoCargador\\' => 
        array (
            0 => __DIR__ . '/../..' . '/AutoCargador',
        ),
        'Api\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Api',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9dbb8d27343757572a72f7e813afd380::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9dbb8d27343757572a72f7e813afd380::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit9dbb8d27343757572a72f7e813afd380::$classMap;

        }, null, ClassLoader::class);
    }
}
