<?php $this->layout('layout'); ?>



<?php $this->start('header')?>
<!-- <header>
  <div class="header-container">
    <div class="logo">
      <a href="?menu=inicio"><img src="/asset/img/favicon1.png" width="20px" height="30px">KebabsLab</a>
     <img id="icono-compra" src="/asset/img/compra.png" height="40px" width="40px" /><b class="carrito-count"></b>
     <div id="carrito" display="none">
     </div>
    </div>
    <div class="menu">
      <nav class="nav-menu">
        <ul>
          <li><a href="?menu=inicio">Inicio</a></li>
          <li><a id="menuKebab">Kebab</a></li>
          <li><a href="?menu=inicio">Conocenos</a></li>
          <li><a id="openModal">Iniciar Sesion</a></li>
        </ul>
      </nav>
      <nav class="nav-admin">
        <ul>
          <li><a href="?menu=gProducto" >Productos</a></li>
          <li><a href="?menu=gUsuario">Usuarios</a></li>
          <li><a href="?menu=gPedido">Pedidos</a></li>
          <li><a href="?menu=gVenta">Ventas</a></li>
        </ul>
      </nav>
    </div>
    
  </div>
  
</header> -->


        <?php
          
          use Controllers\routHead;
          routHead::routHead();
        ?>
        

      

<?php $this->stop('header')?>




<?php $this->start('body') ?>

<section>
        <div id="cuerpo">
        <?php
          //  include __DIR__ . '/../Controllers/rout.php';
          use Controllers\rout;
          rout::rout();
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
        <li><a href="?menu=inicio">Inicio</a></li>
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

