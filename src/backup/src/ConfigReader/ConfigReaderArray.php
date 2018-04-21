<?php

namespace Backup\ConfigReader;

class ConfigReaderArray extends ConfigReaderAbstract
{
    public function __construct($params)
    {
        $this->config = $params;
    }
}
