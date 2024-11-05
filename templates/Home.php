<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


?>




<?php $this->layout('layout'); ?>



<?php $this->start('header')?>
<header>
  <div class="header-container">
    <div class="logo">
      <a href="#">Mi Proyecto</a>
    </div>
    <nav class="menu">
      <ul>
        <li><a href="?inicio">Inicio</a></li>
        <li><a href="?servicios">Servicios</a></li>
        <li><a href="?nosotros">Nosotros</a></li>
        <li><a href="?contacto">Contacto</a></li>
      </ul>
    </nav>
  </div>
</header>

<?php $this->stop('header')?>


//body de la pagina, esto será lo que vaya cambiando

<?php $this->start('body') ?>

<section>
        <div id="cuerpo">
        <?php
           require_once("enruta.php");
        ?>
        </div>
    </section>


<?php $this->stop() ?>



<?php $this->start('footer') ?>
<footer>
  <div class="footer-container">
    <div class="footer-section about">
      <h3>Sobre Nosotros</h3>
      <p>Somos una empresa dedicada a ofrecer servicios de alta calidad en tecnología. Nuestro compromiso es ayudar a nuestros clientes a alcanzar sus objetivos.</p>
    </div>
    <div class="footer-section links">
      <h3>Enlaces Rápidos</h3>
      <ul>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#services">Servicios</a></li>
        <li><a href="#about">Sobre Nosotros</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </div>
    <div class="footer-section contact">
      <h3>Contacto</h3>
      <p>Email: contacto@empresa.com</p>
      <p>Teléfono: +123 456 789</p>
      <p>Dirección: Calle Falsa 123, Ciudad</p>
    </div>
    <div class="footer-section social">
      <h3>Redes Sociales</h3>
      <a href="https://www.facebook.com" target="_blank">Facebook</a> |
      <a href="https://www.twitter.com" target="_blank">Twitter</a> |
      <a href="https://www.instagram.com" target="_blank">Instagram</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Empresa. Todos los derechos reservados.</p>
  </div>
</footer>
<?php $this->stop() ?>
