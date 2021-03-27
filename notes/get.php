<?php
header("Content-Type: application/json");
require_once 'db.php';

$sql = "SELECT * FROM stickynotes";
$results = db_query($sql);
echo(json_encode($results));
?>
