<?php
header('Content-Type: application/json');
use PHPMailer\PHPMailer\PHPMailer;

$data = json_decode(file_get_contents('php://input'), true);

$cuerpo = $data['cuerpo'];
$destinatario = $data['destinatario'];



require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'smtp.tu-servidor.com'; // Configura tu servidor SMTP
$mail->SMTPAuth = true;
$mail->Username = 'tu-correo@ejemplo.com';
$mail->Password = 'tu-contraseña';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('tu-correo@ejemplo.com', 'Tu Nombre');
$mail->addAddress($destinatario);

$mail->Subject = 'Asunto del correo';
$mail->Body    = $cuerpo;

if ($mail->send()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $mail->ErrorInfo]);
}
?>
