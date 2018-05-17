<?php

$zawartosc=file_get_contents('https://api.guildwars2.com/v2/achievements');

#Zbuduj tablicę
$preArray=str_replace('[','',$zawartosc);
$preArray=str_replace(']','',$preArray);

$array=explode(',',$preArray);

foreach($array as $id)
{
    $singleJson=file_get_contents('https://api.guildwars2.com/v2/achievements?id='.$id);
    $escapedJason=str_replace('"','\"',$singleJson);
    $escapedJason=str_replace("'","\'",$escapedJason);

    echo 'UPDATE `achievement_info` SET `Json`=\''.$escapedJason.'\' WHERE `ID`='.$id.';';

    #UPDATE Users SET weight = 160, desiredWeight = 145 WHERE id = 1;
}

?>