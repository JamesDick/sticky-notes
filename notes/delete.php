<?php
header("Content-Type: application/json");
require_once 'db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

function get_post($attr) {
    return isset($_POST[$attr]) ? $_POST[$attr] : '';
}

$sql = "DELETE FROM stickynotes
        WHERE timestamp = :timestamp";

$bindings = array(
    'timestamp' => get_post('timestamp')
);

$results = db_query($sql, $bindings);
echo json_encode(array(
    'deleted' => get_post('timestamp')
));
?>
