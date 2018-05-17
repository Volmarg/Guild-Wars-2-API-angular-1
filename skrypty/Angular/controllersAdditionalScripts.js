//-----------------------------------------------------------------------------------------------------------------------------------------------------\\
//                                                         DODATKOWE FUNKCJE DO CONTROLLERÓW                                                           \\
//-----------------------------------------------------------------------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------------------\\
//                            Pobieranie szczegolow item reward                                     \\
//--------------------------------------------------------------------------------------------------\\

function pobierz_szczegoly_reward(id, typ, region) {

    if (typ == "Item")//#Jeśli item 
    {
        //###### Część odpowiedzialna za nazwe #########\
        var obiekt_zwrocony = pobierz_info_o_reward_achievementu('items', id);
        var item_reward_szczegoly = {
            'name': obiekt_zwrocony.name,
            'icon': obiekt_zwrocony.icon,
            'rarity': obiekt_zwrocony.rarity,
            'typ': 'item'
        }

        //Ustal style nazwy itemu
        var itemRarityColor = '';
        if (item_reward_szczegoly.rarity == 'Ascended') {
            itemRarityColor = {
                "color": "violet"
            }
        }
        else if (item_reward_szczegoly.rarity == 'Exotic') {
            itemRarityColor = {
                "color": "orange"
            }
        }
        else if (item_reward_szczegoly.rarity == 'Rare') {
            itemRarityColor = {
                "color": "yellow"
            }
        }
        else if (item_reward_szczegoly.rarity == 'Fine') {
            itemRarityColor = {
                "color": "blue"
            }
        }

        var returned_object = [item_reward_szczegoly, itemRarityColor]
    }
    else if (typ == 'Mastery') //#Jeśli Mastery
    {
        //###### Część odpowiedzialna za nazwe #########\
        var title_reward_szczegoly = {
            'name': "Mastery Point",
            'typ': 'Mastery',
            'region': region
        }

        var returned_object = [title_reward_szczegoly];
    }
    else if (typ == 'Title') //#Jeśli title 
    {
        //###### Część odpowiedzialna za nazwe #########\
        var obiekt_zwrocony = pobierz_info_o_reward_achievementu('Titles', id);

        var title_reward_szczegoly = {
            'name': obiekt_zwrocony.name,
            'typ': 'title'
        }
        var returned_object = [title_reward_szczegoly];
    }
    else {
        var title_error_reward = {
            'name': 'AnetApiError',
            'typ': 'AnetApiError'
        }
        var returned_object = [title_error_reward];
    }
    return returned_object;

}

//--------------------------------------------------------------------------------------------------\\
//               Pobieranie danych achievementu i obliczanie stopnia ukonczenia                     \\
//--------------------------------------------------------------------------------------------------\\

function pobierz_detale_achievementu(id, obecny_postep, max_postep) {

    this.procent_ukonczenia = Math.ceil(parseInt(obecny_postep) / parseInt(max_postep) * 100); //Postęp

    var obiekt_zwrocony = pobierz_info_o_achievemencie(id); //Nazwa i nagrody

    var proggres_array = { id: this.procent_ukonczenia }
    var szczegoly_achievmentu = {
        'nazwa': obiekt_zwrocony.name,
        'description': obiekt_zwrocony.description,
        'requirement': obiekt_zwrocony.requirement,
        'tiers': obiekt_zwrocony.tiers,
        'reward': obiekt_zwrocony.rewards,
        'error': obiekt_zwrocony.text
    }

    var send_result = [proggres_array, szczegoly_achievmentu];

    return send_result;
}