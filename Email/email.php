<?php
require 'vendor/autoload.php';  // Ruta a la librería PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function enviarCorreo($cuerpo, $destinatario) {
    // Validar correo del destinatario
    if (!filter_var($destinatario, FILTER_VALIDATE_EMAIL)) {
        error_log('Correo inválido: ' . $destinatario);
        return false;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->isSMTP();
        $mail->SMTPDebug = 0; // Cambia a 2 para depuración
        $mail->Host = 'host.docker.internal'; // Servidor SMTP (MailHog para desarrollo)
        $mail->Port = 1025; // Puerto SMTP (MailHog)
        $mail->SMTPAuth = false; // No se requiere autenticación en MailHog

        // Remitente y destinatario
        $mail->setFrom('kebablabs@kebab.com', 'Admin');
        $mail->addAddress($destinatario);

        // Configuración del contenido del correo
        $mail->isHTML(true); // Activar contenido HTML
        $mail->Subject = 'Correo de prueba'; // Asunto
        $mail->Body    = $cuerpo; // Contenido HTML
        $mail->AltBody = strip_tags($cuerpo); // Alternativa de texto plano

        // Enviar correo
        if ($mail->send()) {
            return true;
        } else {
            error_log('Error al enviar correo: ' . $mail->ErrorInfo);
            return false;
        }
    } catch (Exception $e) {
        error_log('Excepción al enviar correo: ' . $mail->ErrorInfo);
        return false;
    }
}
?>
