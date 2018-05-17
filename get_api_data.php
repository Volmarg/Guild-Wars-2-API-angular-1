<?php


//------- NOWY ODBI�R Z DB Mojego --------------\\

#Dane dost�powe do bazy#
$login="volmarg_projekt-gw2api";
$password="k3vZRvAS";
$host="localhost";
$dbName="volmarg_projekt-gw2api";

$db_connect=mysqli_connect($host,$login,$password,$dbName);

function testowe_odpytanie_grafiki_achievementow($id)
{
    global $login,$password,$dbName,$host,$db_connect;

#Zapytanie
    $zapytanie="SELECT `Img_category` from achievement_info WHERE `Id`=$id";
    $odpowiedz=mysqli_query($db_connect,$zapytanie);
    $single_element=mysqli_fetch_array($odpowiedz);

    $result=$single_element[0];
    return $result;
}

function testowe_odpytanie_szczegoly_achievementu($id)
{
    global $login,$password,$dbName,$host,$db_connect;

    $id=str_replace('id=','',$id);
#Zapytanie
    $zapytanie="SELECT `Json` from achievement_info WHERE `Id`=$id";
    $odpowiedz=mysqli_query($db_connect,$zapytanie);
    $single_element=mysqli_fetch_array($odpowiedz);

    $result=$single_element[0];
    return $result;
}


if($_GET['sygnatura']=='pobranieObrazkaAP')
{
    $numer_do_odpytania=$_GET['numerek'];
    $result=testowe_odpytanie_grafiki_achievementow($numer_do_odpytania);
}

if($_GET['sygnatura']=='achievement_info')
{
    $numer_do_odpytania=$_GET['numerek'];
    $result=testowe_odpytanie_szczegoly_achievementu($numer_do_odpytania);
}

echo $result;



?>
