$(function () {
    'use strict';


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
    var up = $('#up');
    var down = $('#down');
    var left = $('#left');
    var right = $('#right');
    var instrPC = $('#instr');
    var controls =  $('.controls');


    spel.hide();
    crash.hide();
    $('#mobileControls').hide();


    var play = buttons.append('<button>Play</button>');

    var startenSpel;
    var startenBew;
    var startenSnelheid;
    var startenScore;
    function isMobile() { return ('ontouchstart' in document.documentElement); }
    if(isMobile())
    {
        scoreText.css('position','absolute');
        scoreText.css('left',12 + '%');
        scoreText.css('top',43 + '%');
        scoreText.css('color','black');

        controls.css('position','absolute');
        controls.css('display','inline');
        controls.css('top',70 +'%');
        controls.css('width', 200 + 'px');
        controls.css('height',200 + 'px');
        controls.css('font-size',100 + 'px');

        up.css('left', 45+'%');
        up.css('top',65 + '%');

        down.css('left', 45+'%');
        down.css('top',85 + '%');

        left.css('left', 25+'%');
        left.css('top',75 + '%');

        right.css('left', 75+'%');
        right.css('top',65 + '%');
    }

    play.on('click', function ()
    {
        snelheid = 3;
        lijnSnelheid = 5;
        score = 0;
        text.html('');
        instrPC.html('');
        $('#mobileControls').show();

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

        if(auto1HPos > 1120)
        {
            auto1HPos = lijn1Height -100;
            auto1.css('left',Math.floor((Math.random() * 200) + 1));

        }
        if(auto2HPos > 1120)
        {
            auto2HPos = lijn1Height -100;
            auto2.css('left',Math.floor((Math.random() * 580) + 280));
        }
        if(auto3HPos > 1120)
        {
            auto3HPos = lijn1Height -100;
            auto3.css('left',Math.floor((Math.random() * 660) + 501));
        }
        if(lijn1HPos > 1120)
        {
            lijn1HPos = lijn1Height -250;
        }
        if(lijn2HPos > 1120)
        {
            lijn2HPos = lijn1Height - 250;
        }
        if(lijn3HPos > 1120)
        {
            lijn3HPos = lijn1Height - 250;
        }
        if(lijn4HPos > 1120)
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
    music.prop('volume', 0.0);

    music.hide();

    var hoogsteWaarde = spel.width() - auto.width() + 80;


    var afstandPerIt = 3;
    var gedrukt = [];
    $(window).keydown(function(event) { gedrukt[event.which] = true; });
    $(window).keyup(function(event) { gedrukt[event.which] = false; });
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

    function bewegen2() {
        auto.css({
            left: function(index ,oudeWaarde) {
                return berekenNWaarde(oudeWaarde, 37, 39);
            },
            top: function(index, oudeWaarde) {
                return berekenNWaarde(oudeWaarde, 38, 40);
            }
        });

     }

     $(document).ready(function(){


         document.body.style.zoom="60%";
         up.click(function(){
             auto.animate({'top': '-=40'}, 20)
         });

         down.click(function(){
             auto.animate({'top': '+=40'}, 20)
         });


         left.click(function () {
             auto.animate({'left': '-=40'}, 20)
         });


         right.click(function () {
             auto.animate({'left': '+=40'}, 20)
         });
    });








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
            $('#mobileControls').hide();
            play.show();
            crash.play();
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
    /**
     * functie botsing
     * @return {boolean}
     */
    function Botsing($_auto1,$_auto2,$_auto3,$_auto4)
    {
        //[x,y,width,height]
        var auto1P = [parseInt($_auto1.css('left')),parseInt($_auto1.css('top')),$_auto1.outerWidth(true)-92,$_auto1.outerHeight(true)-12];
        var auto2P = [parseInt($_auto2.css('left')),parseInt($_auto2.css('top')),$_auto2.outerWidth(true)-92,$_auto1.outerHeight(true)-12];
        var auto3P = [parseInt($_auto3.css('left')),parseInt($_auto3.css('top')),$_auto3.outerWidth(true)-92,$_auto1.outerHeight(true)-12];
        var auto4P = [parseInt($_auto4.css('left')),parseInt($_auto4.css('top')),$_auto4.outerWidth(true)-92,$_auto1.outerHeight(true)-12];



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