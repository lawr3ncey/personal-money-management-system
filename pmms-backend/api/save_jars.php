<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "db.php"; // or keep your mysqli connection here

$data = json_decode(file_get_contents("php://input"), true);
$jars = $data["jars"] ?? [];

foreach ($jars as $jar_name => $amount) {
    $sql = "UPDATE jars SET amount = amount + ? WHERE jar_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ds", $amount, $jar_name);
    $stmt->execute();

    
}

echo json_encode(["success" => true, "message" => "Jars updated successfully!"]);
?>
