<?php

namespace Backup\FileProvider;

class RemoteOld extends FileProviderAbstract
{
    private $connection = null;
    private $sftp = null;
    
    public function dumpDB(String $dumpCommand, String $dumpName)
    {
        $this->connect();
        $stream = \ssh2_exec(
            $this->connection,
            $dumpCommand
        );
        $errorStream = \ssh2_fetch_stream($stream, SSH2_STREAM_STDERR);
        stream_set_blocking($errorStream, true);
        stream_set_blocking($stream, true);
        if ($output = stream_get_contents($stream)) {
            echo "Output: " . $output, PHP_EOL;
        }
        if ($error = stream_get_contents($errorStream)) {
            echo "Error: " . $error, PHP_EOL;
        }
        fclose($errorStream);
        fclose($stream);
        $result = (empty($output) && empty($output));
        if ($result && ($filesize = $this->getFileSize($dumpName))) {
            echo "Size of MySQL dump = " . $filesize, PHP_EOL;
        }
        return $result && $filesize;
    }    

    private function getFileSize(String $dumpName)
    {
        $stat = \ssh2_sftp_stat($this->getSFTP(), $dumpName);
        return ($stat && $stat['size'] > 0)
            ? $stat['size']
            : false;
    }
    
    /**
     * Возвращает конфиг с данными о подключении к БД
     */
    public function getConfigFile(String $path)
    {
        $this->connect();
        $sftp = $this->getSFTP();
        $stream = fopen("ssh2.sftp://$sftp$path", 'r');
        $config = stream_get_contents($stream);
        fclose($stream);
        return $config;
    }
    
    private function connect()
    {
        if (!empty($this->connection)) {
            return;
        }
        $this->connection = \ssh2_connect($this->params['host'], $this->params['port']);
        if (empty($this->params['password'])) {
            return \ssh2_auth_pubkey_file(
                $this->connection,
                $this->params['user'],
                $this->params['public_key'],
                $this->params['private_key']
            );
        }
        return \ssh2_auth_password(
            $this->connection,
            $this->params['user'],
            $this->params['password']
        );
    }
    
    protected function putDumpToDestination(String $source, String $destination)
    {
        \ssh2_scp_recv($this->connection, $source, $destination);
    }
    
    protected function removeDump(String $filepath)
    {
        return \ssh2_sftp_unlink($this->getSFTP(), $filepath);
    }
    
    private function getSFTP()
    {
        return ($this->sftp)
            ? $this->sftp
            : $this->sftp = \ssh2_sftp($this->connection);
    }
}
