<?php

namespace Backup\FileProvider;

class Local extends FileProviderAbstract
{
    public function getConfigFile(String $path)
    {
        if (file($path)) {
            return file_get_contents($path);
        }
        throw new \Exception("File $path doesn't exists", 404);
    }
}
