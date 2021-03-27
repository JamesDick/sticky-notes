<?php
function db_connect()
{
    static $conn;

    if (!isset($conn)) {
        $config = parse_ini_file('.db_connect.ini');
        $conn = new PDO(
            "mysql:dbname={$config['dbname']};host={$config['host']};charset=utf8", 
            $config['user'], 
            $config['pass'],
            array(
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            )
        );
    }

    return $conn;
}

function db_query($sql, $bindings = array())
{
    $conn = db_connect();
    $stmt = $conn->prepare($sql);
    $stmt->execute($bindings);
    return $stmt->fetchAll();
}
