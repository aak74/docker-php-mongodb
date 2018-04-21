<?php

namespace Backup\Database;

class FilesystemLocal implements FilesystemInterface
{
    public function dumpDB($command)
    {
        echo $command;
    }
    
    public function removeDump($path)
    {
        echo $path;
    }
}
