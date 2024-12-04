<?php
require 'vendor/autoload.php';  // Ruta a la librería PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);
if ($data === null) {
    echo json_encode(["message" => "El formato de los datos es inválido"]);
    exit;
}

if (isset($data['cuerpo']) && isset($data['destinatario'])) {
    $cuerpo = $data['cuerpo'];
    $destinatario = $data['destinatario'];

    if (enviarCorreo($cuerpo, $destinatario)) {
        echo json_encode(["message" => "Correo enviado correctamente"]);
    } else {
        echo json_encode(["message" => "Error al enviar el correo"]);
    }
} else {
    echo json_encode(["message" => "Datos de pedido inválidos"]);
}

function enviarCorreo($cuerpo, $destinatario) {
    
    if (!filter_var($destinatario, FILTER_VALIDATE_EMAIL)) {
        error_log('Correo inválido: ' . $destinatario);
        return false;
    }

    $mail = new PHPMailer(true);

try {
    // Configuración SMTP para MailHog
    $mail->isSMTP();                                     // Usar SMTP
    $mail->SMTPDebug = 0;                                 // Desactivar depuración SMTP
    $mail->Host = 'mailhog-pruebaEmail';                 // MailHog corre en localhost
    $mail->Port = 1025;                                   // Puerto de MailHog
    $mail->SMTPAuth = false;                              // No requiere autenticación
    // No establecer SMTPSecure ya que MailHog no soporta TLS ni SSL
    // $mail->SMTPSecure = 'tls';                         // NO es necesario

    // Remitente y destinatario
    $mail->setFrom('jonatan@jonatan.com', 'jona');
    $mail->addAddress('to@example.com', 'Destinatario'); // Dirección del destinatario (puedes dejar cualquier correo ficticio)

   

    // Contenido del correo
    $mail->isHTML(true);                                  // Establecer formato de correo como HTML
    $mail->Subject = 'Correo de prueba';

    
    // Construir el cuerpo del correo con HTML y la tabla generada
    $mail->Body = $cuerpo;

    // Enviar el correo
    if (!$mail->send()) {
        echo 'El mensaje no pudo ser enviado.';
        echo 'Error: ' . $mail->ErrorInfo;
    } else {
        echo 'El mensaje ha sido enviado';
    }
} catch (Exception $e) {
    echo "El mensaje no pudo ser enviado. Error: {$mail->ErrorInfo}";
}

}
?>
