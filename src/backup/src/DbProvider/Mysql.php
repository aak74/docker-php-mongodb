<?php

namespace Backup\DbProvider;

use Backup\FileProvider\FileProviderInterface;

/**
 * Драйвер для backup mysql databases
 */
class Mysql extends DbProviderAbstract
{
    protected function getDumpCommand()
    {
        return 'mysqldump -u '
            . $this->dbCredentials['login']
            . ' -p"' . $this->dbCredentials['password'] . '" ' . $this->dbCredentials['database']
            . ' > '
            . '"' . $this->getDumpName() . '"';
    }
}
