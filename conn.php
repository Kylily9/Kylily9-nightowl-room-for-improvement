<?php
$servername = "localhost";
$username = "root";
$password = ""; // your DB password
$dbname = "night_owl_liquor";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

