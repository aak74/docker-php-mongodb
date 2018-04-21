<?php

namespace Backup;

/**
 * Удаленный backuper
 */
class RemoteBackup
{
    private $connection = null;
    private $sftp = null;

    public function backup()
    {
        if ($this->connect()) {
            echo 'connected', PHP_EOL;
            // echo memory_get_usage();
            memory_get_usage();
            echo 'DB backup started' . PHP_EOL;
            $dumpCommand = $this->getDumpCommand($params);
            echo $dumpCommand, PHP_EOL;
            $this->backupDB($dumpCommand);
            echo 'DB backup finished', PHP_EOL;
            $this->rsync();
            echo 'Files synced', PHP_EOL;
            $this->removeDump();
            echo 'DB dump removed', PHP_EOL;
            return;
        }
        // echo 'Can`t connect to host', PHP_EOL;
    }

    private function getDumpCommand(array $params)
    {
        return 'mysqldump -u '
            . $params['login']
            . ' -p"' . $params['password'] . '" ' . $params['database']
            . ' > '
            . $this->params['path'] . '/' . $this->params['dump_name'];
    }

    private function backupDB($dumpCommand)
    {
        $stream = ssh2_exec(
            $this->connection,
            $dumpCommand
        );

        $errorStream = ssh2_fetch_stream($stream, SSH2_STREAM_STDERR);
        stream_set_blocking($errorStream, true);
        stream_set_blocking($stream, true);

        if ($output = stream_get_contents($stream)) {
            echo "Output: " . $output, PHP_EOL;
        }
        if ($error = stream_get_contents($errorStream)) {
            echo "Error: " . $error, PHP_EOL;
        }
        fclose($errorStream);
        fclose($stream);
        $result = (empty($output) && empty($output));

        if ($result && ($filesize = $this->getFileSize())) {
            echo "Size of msysql dump = " . $filesize, PHP_EOL;
        }
        return $result && $filesize;
    }

    private function getFileSize()
    {
        $sftp = ssh2_sftp($this->connection);
        $dumpName = $this->params['path'] . '/' . $this->params['dump_name'];
        $stat = ssh2_sftp_stat($sftp, $dumpName);
        return ($stat && $stat['size'] > 0)
            ? $stat['size']
            : false;
    }

    private function removeDump()
    {
        return ssh2_sftp_unlink($this->getSFTP(), $this->getPath($this->params['dump_name']));
    }

    private function getSFTP()
    {
        return ($this->sftp)
            ? $this->sftp
            : $this->sftp = ssh2_sftp($this->connection);
    }

    private function getPath($filename)
    {
        if ($this->params['path'][0] == '~') {
            return '.' . substr($this->params['path'], 1) . '/' . $filename;
        }
        return $this->params['path'] . '/' . $filename;
    }

    private function connect()
    {
        $this->connection = ssh2_connect($this->params['host'], $this->params['port']);
        if (empty($this->params['password'])) {
            return ssh2_auth_pubkey_file(
                $this->connection,
                $this->params['user'],
                $this->params['public_key'],
                $this->params['private_key']
            );
        }
        return ssh2_auth_password(
            $this->connection,
            $this->params['user'],
            $this->params['password']
        );
    }

    private function rsync()
    {
        $rsyncCommand = $this->getRsyncCommand();
        echo 'Rsync started', PHP_EOL;
        echo $rsyncCommand, PHP_EOL;
        shell_exec($rsyncCommand);
    }

    private function getRsyncCommand()
    {
        $prefix = (empty($this->params['password']))
            ? ''
            : 'sshpass -p ' . $this->params['password'] . ' ';

        return $prefix . 'rsync -aLz --delete --exclude-from exclude.txt -e "ssh -p '
            . $this->params['port'] . '" '
            . $this->params['user'] . '@'
            . $this->params['host'] . ':'
            . $this->params['path'] . '/ '
            . $this->params['backup_path'] . '/'
            . $this->params['name'];
    }
}
