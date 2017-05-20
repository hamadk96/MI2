$(function () {



    var spel = $('#spel');
    var welkom = $('#welkom');
    var auto = $('#auto1');
    var auto1 = $('#auto2');
    var auto2 = $('#auto3');
    var auto3 = $('#auto4');
    var lijn1 = $('#lijn1');
    var lijn1Height = parseInt(lijn1.css('top'));
    var lijn2 = $('#lijn2');
    var lijn3 = $('#lijn3');
    var lijn4 = $('#lijn4');
    var music = $('#audioDemo');
    var crash = $('#crash');
    var snelheid = 3;
    var lijnSnelheid = 5;
    var scoreText = $('#score2');
    var score = 0;
    var bool = false;
    var text = $('#text');
    var buttons = $('#buttons');


    spel.hide();
    crash.hide();

    var play = buttons.append('<button style="font-family: arial;color: #14396A !important;' +
        'font-size: 50px;text-shadow: 1px 1px 0px #7CACDE;' +
        'box-shadow: 1px 1px 1px #BEE2F9;padding: 10px 25px;' +
        ' -moz-border-radius: 10px; -webkit-border-radius: 10px;' +
        'border-radius: 10px;border: 2px solid #3866A3;background: #63B8EE;' +
        'background: linear-gradient(top,  #63B8EE,  #468CCF);background: -ms-linear-gradient(top,  #63B8EE,  #468CCF);' +
        'background: -webkit-gradient(linear, left top, left bottom, from(#63B8EE), to(#468CCF));' +
        'background: -moz-linear-gradient(top,  #63B8EE,  #468CCF);">Play</button>');

    var startenSpel;
    var startenBew;
    var startenSnelheid;
    var startenScore;
    play.on('click', function ()
    {
        snelheid = 3;
        lijnSnelheid = 5;
        score = 0;

        welkom.hide();
        buttons.hide();
        auto.css('top', 710);
        auto.css('left', 340);
        auto1.css('top',5 + '%');
        auto1.css('left', 75);
        auto2.css('top',5 + '%');
        auto2.css('left', 275);
        auto3.css('top',5 + '%');
        auto3.css('left', 475);
        spel.show();
        spel.children().show();

        startenSpel = setInterval(spelStart,spelStart2);
        startenBew = setInterval(bewegen2,20);
        startenSnelheid = setInterval(Snelheid,8000);
        startenScore = setInterval(scorePlus,200);

    });
    var spelStart2 = 40;

    function spelStart()
    {

        checkCollision();

        var auto1HPos = parseInt(auto1.css('top'));
        var auto2HPos = parseInt(auto2.css('top'));
        var auto3HPos = parseInt(auto3.css('top'));
        var lijn1HPos = parseInt(lijn1.css('top'));
        var lijn2HPos = parseInt(lijn2.css('top'));
        var lijn3HPos = parseInt(lijn3.css('top'));
        var lijn4HPos = parseInt(lijn4.css('top'));

        if(auto1HPos > 800)
        {
            auto1HPos = lijn1Height -100;
            auto1.css('left',Math.floor((Math.random() * 200) + 1));

        }
        if(auto2HPos > 800)
        {
            auto2HPos = lijn1Height -100;
            auto2.css('left',Math.floor((Math.random() * 580) + 280));
        }
        if(auto3HPos > 800)
        {
            auto3HPos = lijn1Height -100;
            auto3.css('left',Math.floor((Math.random() * 660) + 501));
        }
        if(lijn1HPos > 800)
        {
            lijn1HPos = lijn1Height -250;
        }
        if(lijn2HPos > 800)
        {
            lijn2HPos = lijn1Height - 250;
        }
        if(lijn3HPos > 800)
        {
            lijn3HPos = lijn1Height - 250;
        }
        if(lijn4HPos > 800)
        {
            lijn4HPos = lijn1Height - 250;
        }

        auto1.css('top', auto1HPos + snelheid);
        auto2.css('top', auto2HPos + snelheid);
        auto3.css('top', auto3HPos + snelheid);
        lijn1.css('top', lijn1HPos + lijnSnelheid);
        lijn2.css('top', lijn2HPos + lijnSnelheid);
        lijn3.css('top', lijn3HPos + lijnSnelheid);
        lijn4.css('top', lijn4HPos + lijnSnelheid);
    }

    music.get(0).play();
    music.prop('volume', 0.1);

    music.hide();

    var hoogsteWaarde = spel.width() - auto.width();
    var gedrukt = [];
    var afstandPerIt = 3;

//Bewegen speler
function berekenNWaarde(oudeWaarde, toets1, toets2) {
    var nieuweWaarde;
    if (!gedrukt[toets1])
    {
        nieuweWaarde = parseInt(oudeWaarde, 10);
        if (gedrukt[toets2])
        {
            nieuweWaarde += afstandPerIt;
        }
    }
    else
    {
        nieuweWaarde = parseInt(oudeWaarde, 10) - afstandPerIt;
        if (gedrukt[toets2])
        {
            nieuweWaarde += afstandPerIt;
        }


    }
    if (nieuweWaarde < 0)
    {
        return 0;
    }
    else
    {
        if (nieuweWaarde > hoogsteWaarde)
        {
            return hoogsteWaarde;
        }
        else
            {
                return nieuweWaarde;
            }
        }
    }
    $(window).keydown(function(event) { gedrukt[event.which] = true; });
    $(window).keyup(function(event) { gedrukt[event.which] = false; });
    function bewegen2() {
        auto.css({
            left: function(index ,oudeWaarde) {
                return berekenNWaarde(oudeWaarde, 37, 39);
            },
            top: function(index, oldValue) {
                return berekenNWaarde(oldValue, 38, 40);
            }
        });
    }

    //Krijgt een Boolean terug van Botsing(arg1,arg2,arg3,arg4)
    //pakt 4 argumenten
    //als Boolean === true dan stopt het spel
    function checkCollision()
    {
        if(Botsing(auto,auto1,auto2,auto3))
        {

            bool = true;
            clearInterval(startenSpel);
            clearInterval(startenBew);
            clearInterval(startenScore);
            clearInterval(startenScore);
            $.each($('audio'), function () {
                this.pause();
            });


            spel.children().hide();

            play.show();
            crash.get(0).play();
            crash.prop('volume', 0.15);


        }
    }


    //snelheid speler bepalen
    function Snelheid()
    {
        if (score >= 300) {
            if (score < 600) {
                snelheid += 3;
                lijnSnelheid += 3;
            }
            else if (score < 800) {
                snelheid += 5;
                lijnSnelheid += 5;
            }
            else if (score < 9000) {
                snelheid += 7;
                lijnSnelheid += 7;
            }
            else {
                snelheid += 9;
                lijnSnelheid += 9;
            }
        } else {
            snelheid += 1;
            lijnSnelheid += 1;
        }


    }

    //Score aanzetten
    function scorePlus() {
        score++;
        scoreText.text('Score:' + score);

    }

    /*setInterval(function () {
        var imageAuto = auto.css('background-image');
        if(imageAuto = 'url(img/Police1.png)')
        {
            auto.css('background-image','url(img/Police2.png)');
        }
        else if(imageAuto = 'url(img/Police2.png)')
        {
            auto.css('background-image','url(img/Police1.png)');
        }
    },800);*/

    /**
     * functie botsing
     * @return {boolean}
     */
    function Botsing($_auto1,$_auto2,$_auto3,$_auto4)
    {
        //[x,y,width,height]
        var auto1P = [parseInt($_auto1.css('left')),parseInt($_auto1.css('top')),$_auto1.outerWidth(true)-65,$_auto1.outerHeight(true)-10];
        var auto2P = [parseInt($_auto2.css('left')),parseInt($_auto2.css('top')),$_auto2.outerWidth(true)-65,$_auto1.outerHeight(true)-10];
        var auto3P = [parseInt($_auto3.css('left')),parseInt($_auto3.css('top')),$_auto3.outerWidth(true)-65,$_auto1.outerHeight(true)-10];
        var auto4P = [parseInt($_auto4.css('left')),parseInt($_auto4.css('top')),$_auto4.outerWidth(true)-65,$_auto1.outerHeight(true)-10];



        //checken of spelerauto de andere drie auto's raakt
        if(auto1P[0] < auto2P[0] + auto2P[2] && auto1P[0] + auto1P[2] > auto2P[0] && auto1P[1] < auto2P[1] + auto2P[3] && auto1P[3] + auto1P[1] > auto2P[1])
        {
            return true;
        }
        else if(auto1P[0] < auto3P[0] + auto3P[2] && auto1P[0] + auto1P[2] > auto3P[0] && auto1P[1] < auto3P[1] + auto3P[3] && auto1P[3] + auto1P[1] > auto3P[1])
        {
            return true;
        }
        else if(auto1P[0] < auto4P[0] + auto4P[2] && auto1P[0] + auto1P[2] > auto4P[0] && auto1P[1] < auto4P[1] + auto4P[3] && auto1P[3] + auto1P[1] > auto4P[1])
        {
            return true;
        }
        else
        {
            return false;
        }
    }


});