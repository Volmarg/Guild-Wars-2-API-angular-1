//--------------------------------------------------------------------------------------------------\\
//                      Pobierz wszystkie Achievementy na koncie                                    \\
//--------------------------------------------------------------------------------------------------\\

var odpowiedz_achievementy_na_koncie = zapytaj_arene(2, 'account/achievements', twoj_kod_api, '');
var obiekt_achievementy_na_koncie = przetworz_json_na_obiekt(odpowiedz_achievementy_na_koncie);
var obiekt_achievementy_na_koncie_ponizej_100 = [];
var y = 0;



for (x = 0; x <= obiekt_achievementy_na_koncie.length - 1; x++) {

    if (parseInt(obiekt_achievementy_na_koncie[x].current) / parseInt(obiekt_achievementy_na_koncie[x].max) * 100 < 100) {
        obiekt_achievementy_na_koncie_ponizej_100[y] = { "id": obiekt_achievementy_na_koncie[x].id, "current": obiekt_achievementy_na_koncie[x].current, "max": obiekt_achievementy_na_koncie[x].max, "done": obiekt_achievementy_na_koncie[x].done }
        y++;
    }

}

//--------------------------------------------------------------------------------------------------\\
//                      Pobierz wszystkie Achievementy - informacje o nich                          \\
//--------------------------------------------------------------------------------------------------\\

function pobierz_info_o_achievemencie(id) {

    var odpowiedz_achievement_info = zapytaj_arene(2, 'achievements', '', 'id=' + id);
    //var odpowiedz_achievement_info = zapytaj_baze(2, 'achievements', '', 'id=' + id,'achievement_info');
    var obiekt_achievement_info = przetworz_json_na_obiekt(odpowiedz_achievement_info);

    return obiekt_achievement_info;
}

//--------------------------------------------------------------------------------------------------\\
//                      Pobierz grupy kategorii achievementow                                       \\
//--------------------------------------------------------------------------------------------------\\

var odpowiedz_wszystkie_grupy_kategorii_achievementow = zapytaj_arene(2, 'achievements/groups', twoj_kod_api, '');
var obiekt_wszystkie_grupy_kategorii_achievementow = przetworz_json_na_obiekt(odpowiedz_wszystkie_grupy_kategorii_achievementow);

//--------------------------------------------------------------------------------------------------\\
//                      Pobierz wszystkie kategorie achievementow                                   \\
//--------------------------------------------------------------------------------------------------\\

function pobierz_informacje_o_kategori_ap(lista_subkategorii) {
    var ilosc_kategorii = lista_subkategorii.length - 1;
    var obiekt_informacje_o_kategorii = [];

    for (x = 0; x <= ilosc_kategorii; x++) {
        var zbierz_info = zapytaj_arene(2, 'achievements/categories', twoj_kod_api, 'id=' + lista_subkategorii[x]);
        var przetworzone_info = przetworz_json_na_obiekt(zbierz_info);

        obiekt_informacje_o_kategorii[x] = { 'id': przetworzone_info.id, 'nazwa': przetworzone_info.name, 'grafika': przetworzone_info.icon };
    }
    return obiekt_informacje_o_kategorii;
}

//--------------------------------------------------------------------------------------------------\\
//                      Pobierz informacje o reward np. titlu/itemie                                \\
//--------------------------------------------------------------------------------------------------\\

function pobierz_info_o_reward_achievementu(typ_nagrody, id) {

    var odpowiedz_achievement_info = zapytaj_arene(2, typ_nagrody, '', 'id=' + id);
    var obiekt_achievement_info = przetworz_json_na_obiekt(odpowiedz_achievement_info);

    return obiekt_achievement_info;
}





