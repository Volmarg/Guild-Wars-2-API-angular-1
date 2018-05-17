var twoj_kod_api = 'HERE YOUR API CODE';

//--------------------------------------------------------------------------------------------------\\
//                                        Zapytanie do areny                                        \\
//--------------------------------------------------------------------------------------------------\\

function zapytaj_arene(wersja, o_co, kod_api, parametry) {

    var zapytanie_do_anet = new XMLHttpRequest();
    var string_z_zapytaniem = 'https://api.guildwars2.com/v' + wersja + '/' + o_co + '?access_token=' + kod_api + '&' + parametry;

    zapytanie_do_anet.open('GET', string_z_zapytaniem, false);
    zapytanie_do_anet.send();

    odpowiedz_od_anet = zapytanie_do_anet.responseText;
    return odpowiedz_od_anet;

}

//--------------------------------------------------------------------------------------------------\\
//                                        Zapytanie do SQLa                                         \\
//--------------------------------------------------------------------------------------------------\\

function zapytaj_baze(wersja, o_co, kod_api, parametry, sygnatura) {
    if (sygnatura == null || sygnatura == undefined) {
        sygnatura = '';
    }

    var zapytanie_do_bazy = new XMLHttpRequest();
    var string_z_zapytaniem = 'get_api_data.php' + '?co_pobrac=' + o_co + '&kod_api=' + kod_api + '&wersja=' + wersja + '&numerek=' + parametry + '&sygnatura=' + sygnatura;

    zapytanie_do_bazy.open('GET', string_z_zapytaniem, false);
    zapytanie_do_bazy.send();

    odpowiedz_od_anet = zapytanie_do_bazy.responseText;

    return odpowiedz_od_anet;

}
