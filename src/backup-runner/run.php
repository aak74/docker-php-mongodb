<?php
require_once('vendor/autoload.php');

use \Bunny\Client;
use \Bunny\Channel;
use \Bunny\Message;

$connection = [
    'host' => 'projects-rabbitmq',
    'vhost' => '/',    // The default vhost is /
    'user' => 'guest', // The default user is guest
    'password' => 'guest', // The default password is guest
];

$client = (new Client($connection))->connect();
$channel = $client->channel();
$channel->exchangeDeclare('backup', 'fanout');
$queue = $channel->queueDeclare('', false, false, true, false);
$channel->queueBind($queue->queue, 'backup');
echo ' [*] Waiting for backup jobs. To exit press CTRL+C', "\n";

$channel->qos(0, 1);


$channel->run(
    function (Message $message, Channel $channel, Client $client) {
        try {
            $params = base64_decode($message->content);
            echo " [x] {$params}\n";
            require(__DIR__ . '/../service/run_array.php');
            sleep(10);
            $channel->ack($message);
            echo ' [*] Waiting for backup jobs. To exit press CTRL+C', "\n";
        } catch (\Exception $e) {
            $channel->nack($message);
            echo "Error {$e->getMessage()}";
        }
    },
    $queue->queue
);
return;

echo date('h:i:s'), PHP_EOL;
// return 0;