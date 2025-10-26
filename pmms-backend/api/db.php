<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "personal_money_management";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed."]));
}
?>
