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
        <form  id="registroForm">

            <label for="nombre">Nombre:</label>
            <input type="text" name="nombreRegistro" id="nombrer" required>
            <br>           
            <label for="password">Contraseña:</label>
            <input type="password" name="passwordRegistro" id="passwordr" required>
            <br>
            
            <label for="email">Email:</label>
            <input type="email" name="correoRegistro" id="emailr" required>
            <br>
            <label for="direccion">Dirección:</label>
            <input type="text" name="direccionRegistro" id="direccionr" required>
            <br>

            <input  type="submit" value="Registrar">
        </form>
        <div id="errores"></div>
    </div>

    
</body>
</html>