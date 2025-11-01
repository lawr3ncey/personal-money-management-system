<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "db.php"; // <-- use shared connection

$data = json_decode(file_get_contents("php://input"), true);
$jar_name = $data["jar_name"];
$amount = $data["amount"];

$sql = "UPDATE jars SET amount = amount + ? WHERE jar_name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ds", $amount, $jar_name);
$stmt->execute();

echo json_encode(["success" => true]);


?>