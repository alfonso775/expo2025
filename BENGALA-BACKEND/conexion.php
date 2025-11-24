<?php
$servername = "fdb1032.awardspace.net";
$username = "4710421_expo";
$password = "0mPGjGcppxh";
$database = "4710421_expo";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
?>
