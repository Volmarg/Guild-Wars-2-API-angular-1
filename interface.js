//---------------------------------------------------------------------------------------------------------------------------------\\
//                                               Obsługa zdarzeń na DOM                                                             \\
//---------------------------------------------------------------------------------------------------------------------------------\\

$(document).ready(function () {
    //--------------------------------------------------------------------------------------------------\\
    //                                   Timestamp                                                      \\
    //--------------------------------------------------------------------------------------------------\\

    var time_holder = document.getElementById('load_time');
    var end_time = Date.now();
    var script_time = end_time - start_time;

    time_holder.innerHTML = script_time + ' ms';
    //--------------------------------------------------------------------------------------------------\\
    //                        Obsługa Sticky Bar - tablicy achievementow                                \\
    //--------------------------------------------------------------------------------------------------\\

    $(window).on('scroll', function () {
        var ScrollValue = $(window).scrollTop();
        $('#slideMenuTest').html(ScrollValue);

        if (ScrollValue >= 84) {
            $('.achievementInfoHeaderTable')
                .css('position', 'fixed')
                .css('z-index', '1231')
                .css('top', '0px')
        }
        else {
            $('.achievementInfoHeaderTable')
                .css('position', 'relative')
                .css('z-index', '1231')
                .css('top', 'auto')
        }

    })
});

//--------------------------------------------------------------------------------------------------\\
//                   Obsługa ukrytych informacji przy achievemencie (?)                             \\
//--------------------------------------------------------------------------------------------------\\

function mouseoverAchievementInfo(element) {
    element.nextElementSibling.setAttribute('class', 'showAchievementHiddenInfo');
}

function mouseoutAchievementInfo(element) {
    element.nextElementSibling.removeAttribute('class');
}

//Opis i wymagania
function showMoreInfo(id)
{
    $('[data-attached-achievement="' + id + '"]>.moreInfoAchievement').css('display', 'block');
    $('[data-attached-achievement="' + id + '"]>#item_name').css('display', 'none');
    $('[data-attached-achievement="' + id + '"]>#item_icon_holder').css('display', 'none');
}

function hideMoreInfo(id) {
    $('[data-attached-achievement="' + id + '"]>.moreInfoAchievement').css('display', 'none');
    $('[data-attached-achievement="' + id + '"]>#item_name').css('display', 'inline');
    $('[data-attached-achievement="' + id + '"]>#item_icon_holder').css('display', 'block');
}

//--------------------------------------------------------------------------------------------------\\
//           pobieranie subkategorii Achievementów i ich dodawanie po kliknięciu                    \\
//--------------------------------------------------------------------------------------------------\\
var lista_kategorii_obiekt = '';
$(document).ready(function () {
    $(".lista_grup_kategorii>li").click(function () {

        if ($(this)[0].getAttribute('data-submenu') != 'active')//Sprawdzanie czy submenu już jest
        {
            var element = $(this)[0];
            var potomkowie_li = element.childNodes;
            var zawartosc_data = potomkowie_li[1].getAttribute('data-id');

            var object_data = JSON.parse(zawartosc_data);

            lista_kategorii_obiekt = pobierz_informacje_o_kategori_ap(object_data);

            var ile_obiektow = lista_kategorii_obiekt.length - 1;
            //# przygotowywanie menu
            var submenu_subcategories = document.createElement('UL');
            submenu_subcategories.id = "achievements_categories_submenu";

            for (x = 0; x <= ile_obiektow; x++) {
                submenu_subcategories.innerHTML += '<li><img src="' + lista_kategorii_obiekt[x].grafika + '"/>' + '<span>' + lista_kategorii_obiekt[x].nazwa + '</span></li>';
            }

            $(this).append(submenu_subcategories);
            $(this)[0].setAttribute('data-submenu', 'active');
        }
        else {

            var element = $(this);
            var submenu_potomek = element.children('UL');
            submenu_potomek.toggle(200);


        }

    });

    //Rozwijane menu górne
    $('.rarityItemsMenu').hover(function () { menuToggling(this.id) });
    $('.achievementAmountMenu').hover(function () { menuToggling(this.id) });
    $('.achievementPointsMenu').hover(function () { menuToggling(this.id) });
    $('.miniBox').hover(function () { $(this).stop().animate({ right: '0px' }, 500) }, function () { $(this).animate({ right: '-70px' }, 500) });

    function menuToggling(Id) {
        $('#' + Id + '>.subMenu').stop().slideToggle();
    }

    //----------------------------------------------- Inne elementy, nawet testowe -----------------------------------------------\\



})//<< onReady

