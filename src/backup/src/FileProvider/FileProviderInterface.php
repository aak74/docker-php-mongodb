<?php

namespace Backup\FileProvider;

interface FileProviderInterface
{
    public function __construct(array $params, $callback = null);
    public function getConfigFile(String $path);
    // public function getFile(String $path);
}
