<?php

namespace Backup\ConfigReader;

class ConfigReaderAbstract implements ConfigReaderInterface
{
    protected $config = null;
    
    public function getConfig()
    {
        return $this->config;
    }
}
