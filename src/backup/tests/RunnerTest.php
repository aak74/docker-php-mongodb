<?php

namespace AppTests;

use org\bovigo\vfs\vfsStream;
use org\bovigo\vfs\vfsStreamDirectory;
use \Backup\ConfigReader\ConfigReaderInterface;
use \Backup\ConfigReader\ConfigReaderArray;


class RunnerTest extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        $this->defaultParams = [
            'backup_path' => '/mnt/b/backup',
            'host' => 'example.com',
            'user' => 'user',
            'port' => '22',
            'path' => '/var/www/html',
            'name' => 'some-project',
            'dump_name' => 'db.sql',
            'php' => 'php',
            'public_key' => '~/.ssh/id_rsa.pub',
            'private_key' => '~/.ssh/id_rsa'
        ];
        $this->testingClass = new \Backup\Runner(
            new \Backup\ConfigReader\ConfigReaderArray($this->defaultParams)
        );
    }

    /**
     * Должен возвращаться правильный путь источник
     *
     */
    public function getSourcePath()
    {
        $method = new \ReflectionMethod('\Backup\Runner', 'getSourcePath');
        $method->setAccessible(true);
        $this->assertEquals(
            '/var/www/html',
            $method->invoke($this->testingClass)
        );
    }

    /**
     * @test
     * Должен возвращаться правильный путь последней копии
     * Папки из будущего не учитываются,
     * папки с названием не соответствующим формату даты не учитываются
     */
    public function calcLastPathRegularBackup()
    {
        $structure = [
            '2017-12-04' => [
                'ok.txt' => 'fine'
            ],
            '2017-12-05' => [],
            '2017-12-06' => [],
            '2099-12-31' => [], // folder from future
            '2100-12-31' => 'Something else',
        ];
        $this->calcLastPathAndCompare($structure, '2017-12-06');

        $structure['2017-1211'] = []; // folder with bad format
        $this->calcLastPathAndCompare($structure, '2017-12-06');

        $structure['f'] = []; // folder with bad format
        $this->calcLastPathAndCompare($structure, '2017-12-06');

        $structure['2017-12-11 00:00:00'] = []; // folder with right format
        $this->calcLastPathAndCompare($structure, '2017-12-11 00:00:00');
    }

    /**
     * @test
     * Должен возвращаться правильный путь последней копии
     * Для первого бэкапа не должно быть папки источника
     */
    public function calcLastPathFirstBackup()
    {
        // echo 'calcLastPathFirstBackup', PHP_EOL;
        $this->calcLastPathAndCompare([], false);
    }

    /**
     * Вычисляется путь последней копии и сравнивается с ожидаемым
     */
    private function calcLastPathAndCompare($structure, $pattern)
    {
        $reflection = new \ReflectionObject($this->testingClass);
        $method = $reflection->getMethod('calcLastPath');
        $method->setAccessible(true);

        $root = vfsStream::setup('/', null, $structure);
        $folder = $root->url();

        $this->assertEquals(
            $pattern,
            $method->invoke($this->testingClass, $folder)
        );
    }

    /**
     * @test
     */
    public function createFolders()
    {
        $reflection = new \ReflectionObject($this->testingClass);
        $method = $reflection->getMethod('createFolders');
        $method->setAccessible(true);

        $structure = [
            '/mnt/b/' => []
        ];
        $root = vfsStream::setup('/', null, $structure);
        $folder = $root->url() . 'mnt/b/backup/some-project';

        $method->invoke($this->testingClass, $folder);
        $this->assertTrue(is_dir($folder));

    }

    /**
     * Должен возвращаться правильная команда для rsync
     * @test
     */
    public function getRsyncCommand()
    {
        $method = new \ReflectionMethod('\Backup\Runner', 'getRsyncCommand');
        $method->setAccessible(true);
        $property = new \ReflectionProperty('\Backup\Runner', 'destinationPath');
        $property->setAccessible(true);
        $property->setValue($this->testingClass, '2017-12-07');
        $this->assertEquals(
            'rsync -aLz --delete-after --exclude-from exclude.txt -e "ssh -p 22" user@example.com:/var/www/html/ "/mnt/b/backup/some-project/2017-12-07"',
            $method->invoke($this->testingClass)
        );
    }

    /**
     * Должен возвращаться правильная команда для rsync
     * для localhost
     * @test
     */
    public function getRsyncCommandLocalhost()
    {
        $this->testingClass = new \Backup\Runner(
            new \Backup\ConfigReader\ConfigReaderArray([
                'backup_path' => '/mnt/b/backup',
                'host' => 'localhost',
                'path' => '/var/www/html',
                'name' => 'some-project',
            ])
        );
        
        $method = new \ReflectionMethod('\Backup\Runner', 'getRsyncCommand');
        $method->setAccessible(true);
        $property = new \ReflectionProperty('\Backup\Runner', 'destinationPath');
        $property->setAccessible(true);
        $property->setValue($this->testingClass, '2017-12-07');
        
        $this->assertEquals(
            'rsync -aLz --delete-after --exclude-from exclude.txt /var/www/html/ "/mnt/b/backup/some-project/2017-12-07"',
            $method->invoke($this->testingClass)
        );
    }
}
