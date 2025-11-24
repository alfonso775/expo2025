<?php
header("Access-Control-Allow-Origin: https://mellow-semolina-61e427.netlify.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


include "conexion.php";

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$date = $_POST['date'];
$tickets = $_POST['tickets'];
$cardNumber = $_POST['cardNumber'];
$exp = $_POST['exp'];
$cvv = $_POST['cvv'];
$price = 550; // precio por boleto
$total = $tickets * $price;

// 1. registrar usuario
$sqlUser = "INSERT INTO usuarios (nombre, email, telefono, fecha, total)
VALUES ('$name', '$email', '$phone', '$date', '$total')";

if ($conn->query($sqlUser) === TRUE) {
    $user_id = $conn->insert_id;

    // 2. registrar tarjeta
    $cardMasked = substr($cardNumber, 0, 4) . "********" . substr($cardNumber, -4);
    $sqlCard = "INSERT INTO tarjetas (usuario_id, numero, expiracion, cvv)
                VALUES ('$user_id', '$cardMasked', '$exp', '$cvv')";
    $conn->query($sqlCard);

    // 3. rgistrar boletos
    $sqlTickets = "INSERT INTO boletos (usuario_id, cantidad, precio_unitario, total)
                   VALUES ('$user_id', '$tickets', '$price', '$total')";
    $conn->query($sqlTickets);

    echo "success";
} else {
    echo "error: " . $conn->error;
}

$conn->close();
?>
