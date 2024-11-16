<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/asset/css/rstyle.css">
</head>
<body>
    <div class="contenedorRegistro">
        <form action="registro.php" method="post">

            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nombre" required>
            <br>

            
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required>
            <br>
            
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required>
            <br>
            <label for="direccion">Dirección:</label>
            <input type="text" name="direccion" id="direccion" required>
            <br>

            <input type="submit" value="Registrar">
        </form>
    </div>

    
</body>
</html>