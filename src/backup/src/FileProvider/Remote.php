<?php

namespace Backup\FileProvider;

use phpseclib\Net\SSH2;
use phpseclib\Net\SFTP;
use phpseclib\Crypt\RSA;

class Remote extends FileProviderAbstract
{
    private $connection = null;
    private $sftp = null;
    
    public function dumpDB(String $dumpCommand, String $dumpName)
    {
        $ssh = $this->getSSH();
        $result = !$ssh->exec($dumpCommand);

        if ($result && ($filesize = $this->getFileSize($dumpName))) {
            $this->setMessage("Size of database dump = " . $filesize);
        }
        return $result && $filesize;
    }    

    private function getFileSize(String $path)
    {
        $this->connectSFTP();
        return $this->sftp->size($path);
    }
    
    /**
     * Возвращает конфиг с данными о подключении к БД
     */
    public function getConfigFile(String $path)
    {
        $this->connectSFTP();
        return $this->sftp->get($path);
    }

    private function getSSH()
    {
        $connection = new SSH2($this->params['host'], $this->params['port']);
        $this->auth($connection);
        return $connection;
    }

    private function connectSFTP()
    {
        if ($this->sftp) {
            return;
        }
        $this->sftp = new SFTP($this->params['host'], $this->params['port']);
        $this->auth($this->sftp);
    }
    
    private function auth($connection)
    {
        if (empty($this->params['password'])) {
            $key = new RSA();
            $key->loadKey(file_get_contents($this->params['private_key']));
            return $connection->login($this->params['user'], $key);
        }
        return $connection->login($this->params['user'], $this->params['password']);
    }

    private function login($connection, $login, $key)
    {
        if (!$connection->login($login, $key)) {
            throw new \Exception('Not authenticated!');
        }
    }
    
    protected function putDumpToDestination(String $source, String $destination)
    {
        $this->connectSFTP();
        return $this->sftp->get($source, $destination);
    }
    
    protected function removeDump(String $filepath)
    {
        $this->connectSFTP();
        return $this->sftp->delete($filepath);
    }
}
