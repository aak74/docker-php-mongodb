#!/bin/bash
cd $1;
LOGIN=$(awk '/login/{print substr($NF, 2, length($NF) - 3)}' ./bitrix/.settings.php);
DB=$(awk '/database/{print substr($NF, 2, length($NF) - 3)}' ./bitrix/.settings.php);
PASSWORD=$(awk '/password/{print substr($NF, 2, length($NF) - 3)}' ./bitrix/.settings.php);
$(mysqldump -u $LOGIN -p$PASSWORD $DB > db.sql);
# $DB=awk '/database/{print substr($NF, 2, index($NF, ",") - 3)}' .settings.php;
# $PASSWORD=awk '/password/{print substr($NF, 2, index($NF, ",") - 3)}' .settings.php;
