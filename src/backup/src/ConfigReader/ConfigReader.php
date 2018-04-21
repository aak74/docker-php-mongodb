<?php

namespace Backup\ConfigReader;

class ConfigReader extends ConfigReaderAbstract
{
    public function __construct($configName = 'default')
    {
        $filename = __DIR__ . '/../../config/' . $configName . '.php';
        if (\is_file($filename)) {
            $this->config = require($filename);
            return;
        }
        throw new \Exception("Config file $filename doesn`t exists", 1);
    }
}
