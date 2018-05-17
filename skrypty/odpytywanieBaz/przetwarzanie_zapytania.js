//--------------------------------------------------------------------------------------------------\\
//                                         strin na JSON                                   \\
//--------------------------------------------------------------------------------------------------\\

function przetworz_json_na_obiekt(odpowiedz) {
    var odpowiedz_anet_obiekt = JSON.parse(odpowiedz);
    return odpowiedz_anet_obiekt;
}
