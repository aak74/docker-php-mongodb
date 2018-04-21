<?php

namespace AppTests\DbProvider;

use Backup\FileProvider\FileProviderInterface;

class BitrixTest extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        $params = [
            'path' => '/var/www/html',
        ];
        
        $this->testingClass = new \Backup\DbProvider\Bitrix(
            new \Backup\FileProvider\Local($params),
            $params
        );
    }

    /**
     * @test
     * Должен возвращаться правильный путь источник
     */
    public function getPathToConfig()
    {
        $method = new \ReflectionMethod('\Backup\DbProvider\Bitrix', 'getPathToConfig');
        $method->setAccessible(true);
        $this->assertEquals(
            '/var/www/html/bitrix/.settings.php',
            $method->invoke($this->testingClass)
        );
    }
}
