<?php

// while (true) {
//     sleep(30);
// }

require_once('vendor/autoload.php');
use \Bunny\Client;
use \Bunny\Channel;
use \Bunny\Message;

$connection = [
    'host' => $ipaddr,
    'host' => trim(getenv('RABBITMQ_HOST')),
    'vhost' => trim(getenv('RABBITMQ_VHOST')),
    'user' => trim(getenv('RABBITMQ_USER')),
    'password' => trim(getenv('RABBITMQ_PASS')),
];

var_dump($connection);

$client = (new Client($connection))->connect();
$channel = $client->channel();
echo 'Start backup runner' . PHP_EOL;
$channel->exchangeDeclare('backup', 'fanout');
$queue = $channel->queueDeclare('', false, false, true, false);
$channel->queueBind($queue->queue, 'backup');
echo 'Queue created' . PHP_EOL;

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
