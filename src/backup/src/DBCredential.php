<?php

namespace Backup;

/**
 * Данные для подключения к БД
 */
class DBCredential
{
    public function getDbCredentials($connection)
    {
        $sftp = ssh2_sftp($connection);
        $remoteFile = $this->params['path'] . '/bitrix/.settings.php';
        $stream = fopen("ssh2.sftp://$sftp$remoteFile", 'r');
        $content = stream_get_contents($stream);
        fclose($stream);
        $config = include("data://," . $content);
        $connections = $config['connections'];
        if (empty($connections)) {
            // в некоторых версиях раздел connections вложен в exception_handling
            $connections = $config['exception_handling']['connections'];
        }
        if (empty($connections)) {
            throw new \Exception('Connection section not found', 1);
        }
        return $connections['value']['default'];
    }
}
