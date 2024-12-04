<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario con Tres Columnas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="galergeno-container">
        <!-- Columna 1: Formulario -->
        <div class="galergeno-column">
            <div class="galergeno-formulario">
                <h2>CREAR ALERGENO</h2>
                <br>
                <!-- Formulario para crear kebab -->
                <form id="alergeno-registro-form">
                    <label for="ingrediente-foto">FOTO</label>
                    <br>
                    <img id="galergeno-imagen-previa" src="" alt="Vista previa de la foto">
                    <input type="file" id="galergeno-foto" name="galergeno-foto" accept="image/*" capture="camera" onchange="mostrarImagenalergeno(event)">
                    <br>

                    <!-- Imagen previa -->

                    <label for="galergeno-nombre">NOMBRE</label>
                    <br>
                    <input type="text" id="galergeno-nombre" name="galergeno-nombre" required>
                    <br>

                    <br>

                    
                    <button class="crearalergeno">Crear Alergeno</button>
                </form>
            </div>
        </div>


        <!-- Columna 3: Lista de INGREDIENTES -->
        <div class="galergeno-column">
            <h2>LISTA DE ALERGENOS</h2>
            <div class="galergeno-content-alergeno">
               
            </div>
        </div>
    </div>

     <!-- Formulario actualizar INGREDIENT -->
<div id="modal-actualizar-alergeno" class="modalAKA">
    <div class="modal-contentAKA">
        

        
        <div class="modal-inner-containerA">
        <div class="galergeno-columnAK"> <span class="close-buttonAKA" onclick="cerrarModalA()">×</span>
            <!-- Formulario -->
            <div class="galergeno-columnAK">
                <h2>ACTUALIZAR ALERGENO</h2>
                <form id="galergeno-registro-formA" class="galergeno-formularioA">
                    <input type="hidden" id="galergeno-idA" name="galergeno-idA" required>
                    <label for="galergeno-fotoA">FOTO</label>
                    <br>
                    <img id="galergeno-imagen-previaA" src="" alt="Vista previa de la foto">
                    <input type="file" id="galergeno-fotoA" name="galergeno-fotoA" accept="image/*" capture="camera" onchange="mostrarImagenalergenoA(event)">

                    <label for="galergeno-nombreA">NOMBRE</label>
                    <input type="text" id="galergeno-nombreA" name="galergeno-nombreA" required>

                   
                    <button class="actualizaralergenoA">Actualizar Alergeno</button>
                    <button class="borraralergenoA">Borrar Alergeno</button>
                </form>
            </div>

           
        </div>
    </div>

</div>
</body>
</html>
