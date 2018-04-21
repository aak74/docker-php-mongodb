<?php

namespace Backup;

use Carbon\Carbon;
use Backup\ConfigReader\ConfigReaderInterface;

/**
 * Запускатель backup
 */
class Runner
{
    use CallbackTrait;

    const STATUS_START = 0;
    const STATUS_FINISH = 1;
    const DIR_PERMISSION = 0755;
    private $lastPath = null;
    private $sourcePath = null;
    private $destinationPath = null;

    public function __construct(ConfigReaderInterface $reader)
    {
        $this->params = $reader->getConfig();
        $this->params['backup_folder'] = $this->params['backup_path']
            . DIRECTORY_SEPARATOR . $this->params['name'] . DIRECTORY_SEPARATOR;
    }

    public function backup($callback)
    {
        $this->callback = $callback;
        $this->addAction(Status::BACKUP_START);
        $this->calcDestinationPath();
        $this->backupDB();
        $this->backupFiles();
        $this->addAction(Status::BACKUP_FINISH);
    }

    private function backupDB()
    {
        $this->addAction(Status::BACKUP_DB_START);
        if (!empty($this->params['database']) 
        && !empty($this->params['database']['provider'])
        ) {
            $this->createFolders($this->params['backup_folder'] . 'db' . DIRECTORY_SEPARATOR);
            $this->getDump();
        }
        $this->addAction(Status::BACKUP_DB_FINISH);
    }
    
    private function getDump()
    {
        $this->getDbProvider()->getDump();
    }
    
    private function getDbProvider()
    {
        $dbProviderClass = $this->getDbProviderClass();
        return new $dbProviderClass($this->getFileProvider(), $this->params, $this->callback);
    }
    
    private function getDbProviderClass()
    {
        return '\Backup\DbProvider\\' . ucfirst($this->params['database']['provider']);
    }
    
    private function getFileProvider()
    {
        $this->params['destinationName'] = $this->params['backup_folder'] . 'db' . DIRECTORY_SEPARATOR . $this->destinationPath . '.sql';
        $fileProvider = '\Backup\FileProvider\\' . ($this->isLocal() ? 'Local' : 'Remote');
        return new $fileProvider($this->params, $this->callback);
    }
    
    private function backupFiles()
    {
        $this->addAction(Status::BACKUP_FILES_START);
        $this->createFolders($this->params['backup_folder']);
        $this->calcLastPath($this->params['backup_folder']);
        // var_dump($this->lastPath);
        if ($this->lastPath) {
            $this->copyWithHardLinks();
        }
        // return;
        $this->getSourcePath();
        $this->rsync();
        $this->addAction(Status::BACKUP_FILES_FINISH);
    }
    
    private function createFolders($folder)
    {
        // echo $folder, PHP_EOL;
        if (!is_dir($folder)) {
            mkdir($folder, self::DIR_PERMISSION, true);
        }
    }

    /**
     * Вычисляется путь к папке, в которую будет копироваться backup
     */
    private function calcDestinationPath()
    {
        $this->destinationPath = Carbon::now();
    }

    /**
     * Возвращается путь внешнего источника,
     * из которого будут синхронизироваться файлы
     */
    private function getSourcePath()
    {
        // $this->sourcePath = $this->calcLastPath($this->params['backup_folder']);
        $this->sourcePath = $this->params['path'];
        return $this->sourcePath;
    }

    /**
     * Запускается внешний скрипт копирования с хардлинками
     */
    private function copyWithHardLinks()
    {
        $this->addAction(Status::BACKUP_FILES_HLCOPY_START);
        $output = shell_exec(__DIR__ . '/sh/copyWithHardLinks.sh '
            . '"' . $this->params['backup_folder'] . $this->lastPath . '"'
            . ' "' . $this->params['backup_folder'] . $this->destinationPath . '"');
        $this->addAction(Status::BACKUP_FILES_HLCOPY_FINISH);
        // $this->addAction(Status::BACKUP_FILES_HLCOPY_FINISH, $output);
    }

    /**
     * Возвращает последний путь с последней копией,
     * из которого будет скопирована предыдущая копия с хардлинками
     */
    private function calcLastPath($folder)
    {
        // echo Carbon::now();

        $folders = $this->getAllFoldersLtNow($folder);
        // print_r($folders);
        if (count($folders)) {
            $this->lastPath = current($folders);
        }
        return $this->lastPath;
    }

    /**
     * Возвращает все папки в каталоге назначения,
     * имя которых меньше текущего времени
     */
    private function getAllFoldersLtNow($folder)
    {
        // print_r($folder);
        $files = array_diff(scandir($folder, 1), ['..', '.']);
        // print_r($files);
        $now = Carbon::now();
        return array_filter($files, function ($file) use ($folder, $now) {
            /**
             * Отметаем файлы и папки с короткими именами, которые заведомо
             * не подходят в качестве правильного имени папки
             */
            if (strlen($file) < 8) {
                return false;
            }
            // Отметаем файлы
            if (!is_dir($folder . $file)) {
                return false;
            }
            // Пытаемся распарсить имя папки как дату
            try {
                $dt = Carbon::parse($file);
            } catch (\Exception $e) {
                return false;
            }
            /**
             * Отметаем даты больше текущего времени
             */
            if ($dt->gte($now)) {
                return false;
            }
            return true;
        });
    }

    /**
     * Запускает синхронизацию в нужную папку из внешнего источника
     */
    private function rsync()
    {
        $rsyncCommand = $this->getRsyncCommand();
        $this->addAction(Status::BACKUP_FILES_RSYNC_START, $rsyncCommand);
        $output = shell_exec($rsyncCommand);
        $this->addAction(Status::BACKUP_FILES_RSYNC_FINISH, $output);
    }

    /**
     * Возвращает текст команды для rsync
     */
    private function getRsyncCommand()
    {
        // echo __DIR__ . '/../exclude.txt ';

        /**
         * для localhost не нужно подключение по ssh
         */
        if ($this->isLocal()) {
            return 'rsync -aLz --delete-after '
                . '--exclude-from ' . __DIR__ . '/../exclude.txt '
                . $this->params['path'] . DIRECTORY_SEPARATOR . ' '
                . '"' . $this->params['backup_folder'] . $this->destinationPath . '"';
            }
            
            // Для хостов, которые не поддерживают аутентификацию по ключу воспользуемся паролем
            $prefix = (empty($this->params['password']))
            ? ''
            : 'sshpass -p ' . $this->params['password'] . ' ';
            
            return $prefix . 'rsync -aLz --delete-after '
                . '--exclude-from ' . __DIR__ . '/../exclude.txt '
                . '-e "ssh -p '
                . $this->params['port'] . ' -o StrictHostKeychecking=no" '
                . $this->params['user'] . '@'
                . $this->params['host'] . ':'
                . $this->params['path'] . DIRECTORY_SEPARATOR . ' '
                . '"' . $this->params['backup_folder'] . $this->destinationPath . '"';
        }

    /**
     * Добавляет action в целях тестирования
     */
    private function addAction($status, $message = null)
    {
        $this->callbackExec($status, $message);
        $this->actions[] = $status;
    }

    private function isLocal()
    {
        return ($this->params['host'] === 'localhost');
    }

}
