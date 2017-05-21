<?php

$row = 1;
try {
    $dbh = new PDO('mysql:host=127.0.0.1;dbname=resdesk_directory', 'root', 'root', array(PDO::MYSQL_ATTR_LOCAL_INFILE => 1));
    if (($handle = fopen('Desk Roster - ResDesk Sample.csv', 'r')) !== false) {
        if (($handle2 = fopen('UpdatedDeskRoster.csv', 'w')) !== false) {
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                $num = count($data);
                $newData = [];
                if ($row == 1) {
                    for ($c = 0; $c < $num; ++$c) {
                        $newData[$c] = strtolower(str_replace(' ', '_', $data[$c]));
                    }
                } else {
                    for ($c = 0; $c < $num; ++$c) {
                        if($c == 0){
                          echo $data[$c];
                          echo $data[8];
                          echo $data[9];
                        }
                        if (strpos((string) $data[$c], '/') !== false && is_numeric((string) $data[$c][0])) {
                            $date = explode('/', $data[$c]);
                            $newDate = $date[2].'/'.$date[0].'/'.$date[1];
                            $newData[$c] = (string) $newDate;
                        } else {
                            $newData[$c] = (string) $data[$c];
                        }
                    }
                }

                fputcsv($handle2, $newData);
                ++$row;
            }

            fclose($handle2);


            $emptyTable = "TRUNCATE TABLE student";
            $dbh->query($emptyTable);

            $sql = "LOAD DATA LOCAL INFILE 'UpdatedDeskRoster.csv'
                    INTO TABLE student
                    FIELDS TERMINATED BY ','
                    OPTIONALLY ENCLOSED BY '\"'
                    LINES TERMINATED BY '\n'
                    IGNORE 1 LINES;";

            $dbh->query($sql);
        }
        fclose($handle);
    }
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}
