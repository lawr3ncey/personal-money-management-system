<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "db.php"; // or keep your mysqli connection here

$data = json_decode(file_get_contents("php://input"), true);
$jars = $data["jars"] ?? [];

$updated = false; // Track if any updates happen

foreach ($jars as $jar_name => $amount) {

    // Skip if amount is 0 or not a valid number
    if ($amount == 0 || !is_numeric($amount)) {
        continue;
    }
    
    $sql = "UPDATE jars SET amount = amount + ? WHERE jar_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ds", $amount, $jar_name);
    $stmt->execute();

    // If the jar name doesn't exist, insert it
    if ($stmt->affected_rows > 0) {
        $updated = true;
    } 
        else {

            $insert = $conn->prepare("INSERT INTO jars (jar_name, amount) VALUES (?, ?)");
            $insert->bind_param("sd", $jar_name, $amount);
            $insert->execute();

            if ($insert->affected_rows > 0) {
                $updated = true;
            }
        }
        
    }

    if (!$updated) {
        echo json_encode(["success" => false, "message" => "Nothing to Update in Jars"]);
    }
    
    else {
        echo json_encode(["success" => true, "message" => "Jars updated successfully!"]);
    }
?>
