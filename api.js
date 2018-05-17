//Zmienne z dostępem dla innych skryptów
var start_time = '';


(function () {

    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\
    //                                                                    ZMIENNE DLA CONTROLLERÓW                                                           \\
    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\


    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\
    //                                                                    CONTROLLERY                                                                        \\
    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\


    var gw2_obsluga_wynikow = angular.module('osluga_wynikow', ['obslugaMenu','ngAnimate'])
    .run(function ($rootScope) {
        //-- obsluga rootScope
        $rootScope.rarity_types = ['Show All','Ascended', 'Exotic', 'Rare', 'Masterwork', 'Fine', 'Normal'];
    });

    gw2_obsluga_wynikow.controller('achievementy_na_koncie', function ($scope) {

        //----------------Lista zmiennych
        this.lista_achievementow = obiekt_achievementy_na_koncie_ponizej_100;

        this.getImg=function(id)
        {
            var jedenObrazek = zapytaj_baze(2, 'achievements/categories/', twoj_kod_api, id,'pobranieObrazkaAP');
            return jedenObrazek;
        }

        this.ilosc_tierow = '';

        //Ustalanie metod sortowania
        this.sortDefine=function(rodzaj)
        {
            $scope.rodzajSortu = rodzaj;
        }

        /* czas wczytywania ng-repeat */
    })

    //--------------------------------------------------------------------------------------------------\\
    //             Pobieranie informacji ziązanych z achievementami                                     \\
    //--------------------------------------------------------------------------------------------------\\

    gw2_obsluga_wynikow.controller('pobierz_informacje_achievementow', function ($scope,$rootScope) {

        //----------------Pobieranie szczegolow achievementu
        var send_result = pobierz_detale_achievementu($scope.achievements.id, $scope.achievements.current, $scope.achievements.max);
        this.proggres_array = send_result[0];
        this.szczegoly_achievmentu = send_result[1];

        this.stateCheck = typeof this.proggres_array;
        if (this.szczegoly_achievmentu.reward != undefined) {
            if (this.szczegoly_achievmentu.reward[0].id != undefined && this.szczegoly_achievmentu.reward[0].type!=undefined)
            {
                if(this.szczegoly_achievmentu.reward[0].region==undefined)
                {
                    this.szczegoly_achievmentu.reward[0].region=='None region';
                }
                var result_szczegoly_itemu = pobierz_szczegoly_reward(this.szczegoly_achievmentu.reward[0].id, this.szczegoly_achievmentu.reward[0].type, this.szczegoly_achievmentu.reward[0].region); //Volmarg, trzeba ustalić typ reward - tu sie sypie
            }

        }
        else
        {
            var result_szczegoly_itemu = {
                'name': '',
                'icon': '',
                'rarity': ''
            }
        }

        this.item_reward_szczegoly = result_szczegoly_itemu[0];
 
        if (result_szczegoly_itemu[1] == undefined) //# Ustaw kolor ale jeśli nic nie jest przekazywane z funkcji to daj czarny
        {
            $scope.itemRarityColor = {
                "color": "rgb(189,155,76)",
                'font-size':'15px'
            }
        }
        else
        {
            $scope.itemRarityColor = result_szczegoly_itemu[1];
        }

        //----------------Obliczanie obecnego tiera i AP do zdobycia

        if (this.szczegoly_achievmentu.error == undefined) 
        {
        var ileTierow = this.szczegoly_achievmentu.tiers.length;
        this.obecnyTier = '';
        this.apNaTierze = '';
        this.proggresObecnegoTiera = '';
        $rootScope.sortOrderAp = '';

            if (this.szczegoly_achievmentu.tiers != undefined) {
                if (parseInt(ileTierow) > 0) {
                    for (x = 0; x <= ileTierow - 1; x++) {
                        if ($scope.achievements.current <= this.szczegoly_achievmentu.tiers[x].count) {
                            this.obecnyTier = x;
                            this.apNaTierze = this.szczegoly_achievmentu.tiers[x].points;
                                 $rootScope.sortOrderAp = this.szczegoly_achievmentu.tiers[x].points;
                            break;
                        }
                    }

                    this.proggresObecnegoTiera = Math.ceil(this.obecnyTier / this.szczegoly_achievmentu.tiers.length * 100); //Tutaj koniec volmarg
                }
            }
        }

        this.show_controll = function (rarity_of_item) {
            if (this.proggres_array.id < 100 && $rootScope.rarity_types_filter == rarity_of_item && $rootScope.rarity_types_filter != "Show All")
            {
                data_returner = true;
            }
            else if (this.proggres_array.id < 100 && $rootScope.rarity_types_filter == "Show All")
            {
                data_returner = true;
            }
            else
            {
                data_returner = false;
            }

            return data_returner;
        }

    })

    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\
    //                                                            Obsługa zdarzeń na DOM                                                                     \\
    //-------------------------------------------------------------------------------------------------------------------------------------------------------\\

    //# pobieranie subkategorii Achievementów i ich dodawanie po kliknięciu #//
    start_time = Date.now();

})()
