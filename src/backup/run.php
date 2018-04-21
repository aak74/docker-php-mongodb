<?php
if (count($argv) === 1) {
    echo 'Config name is not specified', PHP_EOL;
    exit(1);
}
require_once('./src/bootstrap.php');
$reader = new \Backup\ConfigReader\ConfigReader($argv[1]);
$backup = new \Backup\Runner($reader);
$backup->backup(function ($status, $message = null) {
    echo $status, PHP_EOL;
    if ($message) {
        echo $message, PHP_EOL;
    }
});
