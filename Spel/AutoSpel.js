$(function () {
    

var spel = $('#spel');
var spelHeight = parseInt(spel.Height - "px");
var spelWidth = parseInt(spel.Width);

var auto1 = $('#auto2');
var auto1Width = parseInt(auto1.css('left'));
var auto1Height = parseInt(auto1.css('top'));

var auto2 = $('#auto3');
var auto2Width = parseInt(auto2.css('left'));
var auto2Height = parseInt(auto2.css('top'));

var auto3 = $('#auto4');
var auto3Width = parseInt(auto3.css('left'));
var auto3Height = parseInt(auto3.css('top'));

var lijn1 = $('#lijn1');
var lijn1Height = parseInt(lijn1.css('top'));

var lijn2 = $('#lijn2');
var lijn2Height = parseInt(lijn2.css('top'));

var lijn3 = $('#lijn3');
var lijn3Height = parseInt(lijn3.css('top'));

var snelheid = 3;
var lijnSnelheid = 5;

var hetSpel = setInterval(function()
{


    var auto1HPos = parseInt(auto1.css('top'));
    var auto2HPos = parseInt(auto2.css('top'));
    var auto3HPos = parseInt(auto3.css('top'));
    var lijn1HPos = parseInt(lijn1.css('top'));
    var lijn2HPos = parseInt(lijn2.css('top'));
    var lijn3HPos = parseInt(lijn3.css('top'));

    if(auto1HPos > 700)
    {
        auto1HPos = lijn1Height -100;
    }
    if(auto2HPos > 700)
    {
        auto2HPos = lijn1Height -100;
    }
    if(auto3HPos > 700)
    {
        auto3HPos = lijn1Height -100;
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



});




