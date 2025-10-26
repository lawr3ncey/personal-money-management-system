<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$income = $_POST['income'] ?? 0;
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