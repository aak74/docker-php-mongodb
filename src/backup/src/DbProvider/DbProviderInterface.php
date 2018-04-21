<?php

namespace Backup\DbProvider;

use Backup\FileProvider\FileProviderInterface;

interface DbProviderInterface
{
    public function __construct(FileProviderInterface $fileProvider, array $params,$callback = null);
    public function getDump();
}
