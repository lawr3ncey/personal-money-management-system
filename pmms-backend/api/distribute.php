<?php
// ✅ CORS Headers — must be first before any output
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// ✅ Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ✅ Set JSON output
header("Content-Type: application/json");

// ✅ Main logic
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Support both JSON (React) and FormData (manual POST)
$income = isset($data['income']) ? floatval($data['income']) : ($_POST['income'] ?? 0);
$income = floatval($income);

$jars = [
    'Necessities' => $income * 0.55,
    'Financial Freedom' => $income * 0.10,
    'Education' => $income * 0.10,
    'Long-Term Savings' => $income * 0.10,
    'Play' => $income * 0.10,
    'Give' => $income * 0.05,
];

echo json_encode([
    'status' => 'success',
    'jars' => $jars,
]);
?>
