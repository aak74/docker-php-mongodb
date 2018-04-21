#!/bin/bash
# mkdir oak
# rm -rf ./oak
BACKUP_PATH=~/backup
HOST=bitrix@192.168.1.233
PORT=22
PROJECT_PATH=ext_www/uacrussia.clients2.arealidea.ru/
PROJECT_NAME=uacrussia
DUMP_NAME=db.sql
# HOST=develop@gbdev.xyz
# PORT=9022
# PROJECT_PATH=www/pravo.gbdev.xyz/
# PROJECT_NAME=pravo-rosta
# DUMP_NAME=db.sql

ssh $HOST -p $PORT  'bash -s' < mysqldump.sh -- $PROJECT_PATH $DUMP_NAME
# scp -P 9022 develop@gbdev.xyz:~/www/oak2.gbdev.xyz/db.sql ./oak
mkdir $BACKUP_PATH
rsync -avz --delete --exclude-from 'exclude.txt' -e "ssh -p $PORT" $HOST:$PROJECT_PATH $BACKUP_PATH/$PROJECT_NAME
# rsync -avz --delete --exclude-from 'exclude.txt' -e "ssh -p $PORT" $HOST: ./$PROJECT_NAME
ssh $HOST -p $PORT  'bash -s' < delete.sh -- $PROJECT_PATH$DUMP_NAME
