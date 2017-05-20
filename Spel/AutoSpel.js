$(function () {


    var spel = $('#spel');


    var auto = $('#auto1');

    var auto1 = $('#auto2');


    var auto2 = $('#auto3');


    var auto3 = $('#auto4');


    var lijn1 = $('#lijn1');
    var lijn1Height = parseInt(lijn1.css('top'));

    var lijn2 = $('#lijn2');


    var lijn3 = $('#lijn3');


    var music = $('#audioDemo');


    var snelheid = 3;
    var lijnSnelheid = 5;

    var scoreText = $('#score2');
    var score = 0;


    var verlorenBool = false;


    var hetSpel = setInterval(function()
        {

            if(Botsing(auto,auto1,auto2,auto3))
            {
                clearInterval(hetSpel);
                clearInterval(bewegen);
                clearInterval(scoreInt);
                $.each($('audio'), function () {
                this.pause();
            });
            verlorenBool = true;

    }


    var auto1HPos = parseInt(auto1.css('top'));


    var auto2HPos = parseInt(auto2.css('top'));


    var auto3HPos = parseInt(auto3.css('top'));
    

    var lijn1HPos = parseInt(lijn1.css('top'));
    var lijn2HPos = parseInt(lijn2.css('top'));
    var lijn3HPos = parseInt(lijn3.css('top'));





    if(auto1HPos > 700)
    {
        auto1HPos = lijn1Height -100;
        auto1.css('left',Math.floor((Math.random() * 200) + 1));

    }
    if(auto2HPos > 700)
    {
        auto2HPos = lijn1Height -100;
        auto2.css('left',Math.floor((Math.random() * 580) + 280));
    }
    if(auto3HPos > 700)
    {
        auto3HPos = lijn1Height -100;
        auto3.css('left',Math.floor((Math.random() * 660) + 501));
    }
    if(lijn1HPos > 700)
    {
        lijn1HPos = lijn1Height -100;
    }
    if(lijn2HPos > 700)
    {
        lijn2HPos = lijn1Height - 100;
    }
    if(lijn3HPos > 700)
    {
        lijn3HPos = lijn1Height - 100;
    }

    auto1.css('top', auto1HPos + snelheid);
    auto2.css('top', auto2HPos + snelheid);
    auto3.css('top', auto3HPos + snelheid);
    lijn1.css('top', lijn1HPos + lijnSnelheid);
    lijn2.css('top', lijn2HPos + lijnSnelheid);
    lijn3.css('top', lijn3HPos + lijnSnelheid);




    },40);


music.get(0).play();
music.prop('volume', 0);
music.hide();


var hoogsteWaarde = spel.width() - auto.width();
var gedrukt = [];
var afstandPerIt = 3;

function berekenNWaarde(oudeWaarde, toets1, toets2) {
    var nieuweWaarde;
    if (!gedrukt[toets1]) {
        nieuweWaarde = parseInt(oudeWaarde, 10);
        if (gedrukt[toets2]) {
            nieuweWaarde += afstandPerIt;
        }
        }
    else
        {
            nieuweWaarde = parseInt(oudeWaarde, 10) - afstandPerIt;
            if (gedrukt[toets2]) {
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

    var bewegen = setInterval(function() {
        auto.css({
            left: function(index ,oudeWaarde) {
                return berekenNWaarde(oudeWaarde, 37, 39);
            },
            top: function(index, oldValue) {
                return berekenNWaarde(oldValue, 38, 40);
            }
        });
    }, 20);



    var beginScore = setInterval(function()
    {
        if (score >= 300) {
            if (score < 500) {
                snelheid += 3;
                lijnSnelheid += 3;
            }
            else if (score < 600) {
                snelheid += 5;
                lijnSnelheid += 5;
            }
            else if (score < 650) {
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
         console.log(snelheid);

    },8000);









        var scoreInt = setInterval(function () {
            score++;
            scoreText.text('Score:' + score);

        }, 200);





    /**
     * @return {boolean}
     */
    function Botsing($_auto1,$_auto2,$_auto3,$_auto4)
    {
        //[x,y,width,height]
        var auto1P = [parseInt($_auto1.css('left')),parseInt($_auto1.css('top')),$_auto1.outerWidth(true)-23,$_auto1.outerHeight(true)-5];
        var auto2P = [parseInt($_auto2.css('left')),parseInt($_auto2.css('top')),$_auto2.outerWidth(true)-23,$_auto1.outerHeight(true)-5];
        var auto3P = [parseInt($_auto3.css('left')),parseInt($_auto3.css('top')),$_auto3.outerWidth(true)-23,$_auto1.outerHeight(true)-5];
        var auto4P = [parseInt($_auto4.css('left')),parseInt($_auto4.css('top')),$_auto4.outerWidth(true)-23,$_auto1.outerHeight(true)-5];



        //checken of spelerauto botst met 3 andere auto's
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




