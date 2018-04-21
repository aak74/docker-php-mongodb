<?php

namespace Backup\DbProvider;

use Backup\FileProvider\FileProviderInterface;
use Backup\Status;

class DbProviderAbstract implements DbProviderInterface
{
    use \Backup\CallbackTrait;

    protected $params = null;
    protected $dbCredentials = null;
    
    public function __construct(FileProviderInterface $fileProvider, array $params, $callback = null)
    {
        $this->callback = $callback;
        $this->fileProvider = $fileProvider;
        $this->params = $params;
    }

    public function getDump()
    {
        $this->getDbCredentials();
        $this->backup();
        $this->fileProvider->moveDumpToDestination($this->getDumpName(), $this->getDestinationName());
    }
    
    protected function getDbCredentials()
    {
        $this->callbackExec(Status::BACKUP_DB_CREDENTIALS_START);
        $path = $this->getPathToConfig();
        $file = $this->fileProvider->getConfigFile($path);
        $this->parseConfigFile($file);
        $this->callbackExec(Status::BACKUP_DB_CREDENTIALS_FINISH);
        return $this->dbCredentials;
    }
    
    protected function getPathToConfig()
    {
        return $this->params['path'];
    }
    
    protected function parseConfigFile(String $file)
    {
        throw new \Exception('Function parseConfigFile must be overridden', 501);
    }
    
    protected function backup()
    {
        $this->callbackExec(Status::BACKUP_DB_DUMP_START);
        $dumpCommand = $this->getDumpCommand();
        $this->fileProvider->dumpDB($dumpCommand, $this->getDumpName());
        $this->callbackExec(Status::BACKUP_DB_DUMP_FINISH);
    }
    
    protected function getDumpName()
    {
        return '/tmp/dump-' . $this->params['name'] . '.sql';
        return '"dump-' . $this->params['name'] . '.sql"';
    }
    
    protected function getDestinationName()
    {
        return $this->params['destinationName'];
    }
}
