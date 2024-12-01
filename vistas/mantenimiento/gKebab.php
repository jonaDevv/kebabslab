<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario con Tres Columnas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="gkebab-container">
        <!-- Columna 1: Formulario -->
        <div class="gkebab-column">
            <div class="gkebab-formulario">
                <h2>CREAR KEBAB</h2>
                <br>
                <!-- Formulario para crear kebab -->
                <form id="gkebab-registro-form">
                    <label for="gkebab-foto">FOTO</label>
                    <input type="file" id="gkebab-foto" name="gkebab-foto" accept="image/*" capture="camera" onchange="mostrarImagen(event)">
                    <br>

                    <!-- Imagen previa -->
                    <img id="gkebab-imagen-previa" src="" alt="Vista previa de la foto">

                    <label for="gkebab-nombre">NOMBRE</label>
                    <br>
                    <input type="text" id="gkebab-nombre" name="gkebab-nombre" required>
                    <br>

                    <br>

                    <label for="gkebab-ingredientes">INGREDIENTES</label>
                   
                    <div id="gkebab-ingredientes-drop" class="gkebab-drop-area">
    
                    </div>
                    <br>

                    <label for="gkebab-precio">Precio</label>
                    <input type="number" id="gkebab-precio" name="gkebab-precio" step="0.01" required>
                    <br>
                    
                    <button class="crearKebab">Crear Kebab</button>
                </form>
            </div>
        </div>

        <!-- Columna 2: Ingredientes -->
        <div class="gkebab-column">
            <h2>INGREDIENTES DISPONIBLES</h2>
            <div class="gkebab-content-ingredientes">
              
   
            </div>
        </div>

        <!-- Columna 3: Lista de Kebab -->
        <div class="gkebab-column">
            <h2>LISTA DE KEBABS</h2>
            <div class="gkebab-content-kebab">
               
            </div>
        </div>
    </div>

    

</body>
</html>
