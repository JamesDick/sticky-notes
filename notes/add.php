<?php
header('Content-Type: application/json');
require_once 'db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

function get_post($attr) {
    return isset($_POST[$attr]) ? $_POST[$attr] : '';
}

$sql = "INSERT INTO stickynotes (timestamp, text, colour)
        VALUES (:timestamp, :text, :colour)";

$bindings = array(
    'timestamp' => get_post('timestamp'),
    'text' => get_post('text'),
    'colour' => get_post('colour')
);

$results = db_query($sql, $bindings);
echo json_encode($bindings);
?>
