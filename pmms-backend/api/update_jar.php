<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$jar_name = $data["jar_name"] ?? null;
$amount = floatval($data["amount"] ?? 0);
$action = $data["action"] ?? null;

if (!$jar_name || !$action) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

// ✅ Fetch current amount
$stmt = $conn->prepare("SELECT amount FROM jars WHERE jar_name = ?");
$stmt->bind_param("s", $jar_name);
$stmt->execute();
$result = $stmt->get_result();
$currentJar = $result->fetch_assoc();
$currentAmount = $currentJar["amount"] ?? 0;

switch ($action) {
    case "add":
        if ($amount <= 0) {
            echo json_encode(["success" => false, "message" => "Amount must be positive"]);
            exit;
        }
        $newAmount = $currentAmount + $amount;
        break;

    case "subtract":
        if ($amount <= 0) {
            echo json_encode(["success" => false, "message" => "Amount must be positive"]);
            exit;
        }
        if ($amount > $currentAmount) {
            echo json_encode(["success" => false, "message" => "Not enough funds"]);
            exit;
        }
        $newAmount = $currentAmount - $amount;
        break;

    case "edit":
        if ($amount < 0) {
            echo json_encode(["success" => false, "message" => "Amount cannot be negative"]);
            exit;
        }
        $newAmount = $amount;
        break;

    default:
        echo json_encode(["success" => false, "message" => "Invalid action"]);
        exit;
}

$update = $conn->prepare("UPDATE jars SET amount = ? WHERE jar_name = ?");
$update->bind_param("ds", $newAmount, $jar_name);
$update->execute();

echo json_encode([
    "success" => true,
    "message" => "Jar updated successfully!",
    "newAmount" => $newAmount
]);
?>
