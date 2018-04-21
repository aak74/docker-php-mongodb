<?php

namespace AppTests;

class MySQLTest extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        $this->testingClass = new \Backup\Database\MySQL;
    }

    /**
     * Должен возвращаться правильный путь для удаления
     */
    // public function testGetPath()
    // {
    //     $method = new \ReflectionMethod('\App\RemoteBackup', 'getPath');
    //     $method->setAccessible(true);
    //     $this->assertEquals(
    //         '/var/www/html/db.sql',
    //         $method->invoke($this->testingClass, 'db.sql')
    //     );
    // }

    /**
     * Должен возвращаться правильная команда для backup DB
     * @test1
     */
    public function getDumpCommand()
    {
        $method = new \ReflectionMethod('\Backup\Database\MySQL', 'getDumpCommand');
        $method->setAccessible(true);
        $params = [
            'database' => 'dbname',
            'login' => 'login',
            'password' => 'password',
            'dump_path' => '/var/www/html',
            'dump_name' => 'db.sql'
        ];
        $this->assertEquals(
            'mysqldump -u login -p"password" dbname > /var/www/html/db.sql',
            $method->invoke($this->testingClass, $params)
        );
    }
}
