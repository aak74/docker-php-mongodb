<?php

namespace Backup\Database;

use FilesystemInterface;

/**
 * Драйвер для backup mysql databases
 */
class MySQL
{
    private $filesystem = null;
    
    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    public function backup(array $params)
    {
        $this->backupDB();
    }

    private function backupDB()
    {
        $dumpCommand = $this->getDumpCommand($params);
        $this->filesystem->dumpDB($dumpCommand);
    }
    
    private function removeDump()
    {
    }
    
    private function getDumpCommand(array $params)
    {
        return 'mysqldump -u '
            . $params['login']
            . ' -p"' . $params['password'] . '" ' . $params['database']
            . ' > '
            . $params['dump_path'] . '/' . $params['dump_name'];
    }

}
