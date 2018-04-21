```puml
title Backup scheme

Runner : backup()
DBDriver : getDumpCommand()
Filesystem : backupDB()
Filesystem : getDump()

Runner *-- DBDriver
DBDriver *-- Filesystem
```
