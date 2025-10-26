<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php"; // your connection file

$sql = "SELECT * FROM jars";
$result = $conn->query($sql);

$jars = [];
while ($row = $result->fetch_assoc()) {
    $jars[] = $row;
}

echo json_encode(["success" => true, "jars" => $jars]);
?>