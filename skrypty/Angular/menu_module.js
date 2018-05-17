//-------------------------------------------------------------------------------------------------------------------------------------------------------\\
//                                                    MENU-dodatkowe funkcje                                                                             \\
//-------------------------------------------------------------------------------------------------------------------------------------------------------\\

//--------------------------------------------------------------------------------------------------\\
//                 Filtrowanie - liczba achievementów                                               \\
//--------------------------------------------------------------------------------------------------\\

function valueChangeShow(element) {
    var ustawionaIlosc = element;
    //alert(ustawionaIlosc);
    $('#valueHolderApAmount').html(ustawionaIlosc);

}



(function () {
    var obslugaMenu = angular.module('obslugaMenu', []);


    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\
    //                                                    MENU                                                                                                \\
    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\


    //--------------------------------------------------------------------------------------------------\\
    //                      Pobieranie GRUP Kategorii achievementów                                     \\
    //--------------------------------------------------------------------------------------------------\\

    obslugaMenu.controller('grupy_kategorii', function () {
        this.elementy_grupy_kategorii = obiekt_wszystkie_grupy_kategorii_achievementow;

        this.testowe = '';

        this.tablica_informacji_o_grupie = zbierz_informacje_o_grupie(this.elementy_grupy_kategorii);

        function zbierz_informacje_o_grupie(id) {
            var odpowiedz_elementy_grupy_kategorii = zapytaj_arene(2, 'achievements/groups', twoj_kod_api, 'ids=' + id);
            var obiekt_elementy_grupy_kategorii_info = przetworz_json_na_obiekt(odpowiedz_elementy_grupy_kategorii);
            var ile_elementow

            return obiekt_elementy_grupy_kategorii_info;

        }
    })

    //--------------------------------------------------------------------------------------------------\\
    //                                        Filtrowanie                                               \\
    //--------------------------------------------------------------------------------------------------\\
 
    obslugaMenu.controller('FilterMenu', function ($rootScope) {

        $rootScope.rarity_types_filter = 'Show All';
        this.getRarity = function (element) {
            var rairtyType = $(element.target).html();
            $rootScope.rarity_types_filter = rairtyType;

        }

        $rootScope.filterLiczbaAP = 5;
        this.getAchievementAmount = function (element) {
            var ustawionaIlosc = element.target.childNodes[1].value;
            $rootScope.filterLiczbaAP = ustawionaIlosc;
        }

    })

    //--------------------------------------------------------------------------------------------------\\
    //                                        Sortowanie                                                \\
    //--------------------------------------------------------------------------------------------------\\

    obslugaMenu.controller('sortMenu', function ($rootScope) {

        //dopisz +/- by określić kierunek
        function kierunekSortu(sortBy, sortOrder) {
            var returnSort = '';
            if (sortOrder == 'ASC') {
                returnSort = sortBy;
            }
            else if (sortOrder == "DESC") {
                returnSort = '-'+sortBy;
            }
            return returnSort;
        }

        // ustal typ sortu, po czym sortować
        this.sortRules = function (checkboxStatus, sortData) {
            var obiekt = JSON.parse(sortData);

            $rootScope.sortAchievements = 'max/current';

            if(checkboxStatus==true)
            {
                if (obiekt.sortBy == 'percentDoneAll')
                {
                    $rootScope.sortAchievements = 'max/current';
                }
                else if (obiekt.sortBy == 'percentDoneTier') {
                    $rootScope.sortAchievements = 'Sort wg. % Tiera';
                }
                else if (obiekt.sortBy == 'achievementSort') {
                    $rootScope.sortAchievements = 'achievement_info.apNaTierze';
                }

                $rootScope.sortAchievements = kierunekSortu($rootScope.sortAchievements, obiekt.sortOrder);
            }


        }
    });

})();

/*

 number: {{testableForm.number.$valid}} </br>
            Form: {{testableForm.$valid}}


*/