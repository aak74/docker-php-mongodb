<?php
echo PHP_EOL;
echo 1, PHP_EOL;
print_r($params);
echo 2, PHP_EOL;
// return;
require_once(__DIR__ . '/src/bootstrap.php');
$params = json_decode($params, true);
$params['backup_path'] = '/mnt/b/backup';

$reader = new \Backup\ConfigReader\ConfigReaderArray($params);
$backup = new \Backup\Runner($reader);
$backup->backup(function ($status, $message = null) {
    echo $status, PHP_EOL;
    if ($message) {
        echo $message, PHP_EOL;
    }
});