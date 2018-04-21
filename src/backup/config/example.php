<?php
return array_merge(
    require_once('default.php'),
    [
        'host' => 'example.com',
        'user' => 'bitrix',
        'port' => '2222',
        'path' => '/var/www/html',
        'name' => 'example',
    ]
);
