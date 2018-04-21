<?php

namespace Backup\FileProvider;

use Backup\Status;

abstract class FileProviderAbstract implements FileProviderInterface
{
    use \Backup\CallbackTrait;

    protected $params = null;
    protected $message = null;
    
    public function __construct(array $params, $callback = null)
    {
        $this->callback = $callback;
        $this->params = $params;
    }

    abstract public function getConfigFile(String $path);
    
    public function moveDumpToDestination(String $source, String $destination)
    {
        $this->callbackExec(Status::BACKUP_DB_DUMP_COPY_START);
        $this->putDumpToDestination($source, $destination);
        $this->removeDump($source);
        $this->callbackExec(Status::BACKUP_DB_DUMP_COPY_FINISH, $this->message);
    }

    protected function setMessage(String $message)
    {
        $this->message = $message;
    }
}
