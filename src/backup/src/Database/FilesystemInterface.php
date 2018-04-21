<?php

namespace Backup\Database;

interface FilesystemInterface
{
    public function dumpDB($command);
    public function removeDump($path);
}
