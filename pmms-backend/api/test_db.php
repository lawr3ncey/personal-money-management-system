<?php
include "db.php";

if ($conn) {
    echo json_encode(["message" => "✅ Database connected successfully!"]);
} else {
    echo json_encode(["message" => "❌ Failed to connect to database"]);
}
?>
