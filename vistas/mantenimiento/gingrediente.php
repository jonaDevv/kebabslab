<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario con Tres Columnas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="gingrediente-container">
        <!-- Columna 1: Formulario -->
        <div class="gingrediente-column">
            <div class="gingrediente-formulario">
                <h2>CREAR INGREDIENTE</h2>
                <br>
                <!-- Formulario para crear kebab -->
                <form id="ingrediente-registro-form">
                    <label for="ingrediente-foto">FOTO</label>
                    <br>
                    <img id="gingrediente-imagen-previa" src="" alt="Vista previa de la foto">
                    <input type="file" id="gingrediente-foto" name="gingrediente-foto" accept="image/*" capture="camera" onchange="mostrarImageningrediente(event)">
                    <br>

                    <!-- Imagen previa -->

                    <label for="gingrediente-nombre">NOMBRE</label>
                    <br>
                    <input type="text" id="gingrediente-nombre" name="gingrediente-nombre" required>
                    <br>

                    <br>

                    <label for="gingrediente-alergenos">ALERGENOS</label>
                   
                    <div id="gingrediente-alergenos-drop" class="gingrediente-drop-area">
    
                    </div>
                    <br>

                    <label for="gingrediente-precio">Precio</label>
                    <input type="number" id="gingrediente-precio" name="gingrediente-precio" step="0.01" required>
                    <br>
                    
                    <button class="crearingrediente">Crear Ingrediente</button>
                </form>
            </div>
        </div>

        <!-- Columna 2: Ingredientes -->
        <div class="gingrediente-column">
            <h2>ALERGENOS DISPONIBLES</h2>
            <div class="gingrediente-content-alergenos">
              
   
            </div>
        </div>

        <!-- Columna 3: Lista de INGREDIENTES -->
        <div class="gingrediente-column">
            <h2>LISTA DE INGREDIENTES</h2>
            <div class="gingrediente-content-ingrediente">
               
            </div>
        </div>
    </div>

     <!-- Formulario actualizar INGREDIENT -->
<div id="modal-actualizar-ingrediente" class="modalAKI">
    <div class="modal-contentAKI">
        

        <!-- Contenedor interno para organizar el formulario y los ingredientes -->
        <div class="modal-inner-containerI">
            <!-- Formulario -->
            <div class="gingrediente-columnAK">
                <h2>ACTUALIZAR INGREDIENTE</h2>
                <form id="gingrediente-registro-formA" class="gingrediente-formularioA">
                    <input type="hidden" id="gingrediente-idA" name="gingrediente-idA" required>
                    <label for="gingrediente-fotoA">FOTO</label>
                    <br>
                    <img id="gingrediente-imagen-previaA" src="" alt="Vista previa de la foto">
                    <input type="file" id="gingrediente-fotoA" name="gingrediente-fotoA" accept="image/*" capture="camera" onchange="mostrarImageningredienteA(event)">

                    <label for="gingrediente-nombreA">NOMBRE</label>
                    <input type="text" id="gingrediente-nombreA" name="gingrediente-nombreA" required>

                    <label for="gingrediente-alergenosA">ALERGENOS</label>
                    <div id="gingrediente-alergenos-dropA" class="gingrediente-drop-areaA"></div>

                    <label for="gingrediente-precioA">Precio</label>
                    <input type="number" id="gingrediente-precioA" name="gingrediente-precioA" step="0.01" required>

                    <button class="actualizaringredienteA">Actualizar Ingrediente</button>
                    <button class="borraringredienteA">Borrar Ingrediente</button>
                </form>
            </div>

            <div class="gingrediente-columnAK"> <span class="close-buttonAKI" onclick="cerrarModalI()">×</span>
            <!-- Ingredientes disponibles -->
                <h2>ALERGENOS DISPONIBLES</h2>
                <div class="gingrediente-content-alergenosAK">
                    <!-- Aquí irán los ingredientes -->
                </div>
            </div>
        </div>
    </div>

</div>
</body>
</html>
