"use strict";
/*global $ */
$(document).ready(function () 
{
    var plaats = $("li").last().detach();
    var aantal = $("li").length;
    var lijn   = $("li:nth-child(3n)").text();
    
    $($("li").first()).before("Aantal plaatsen: " + aantal);
    $($("li").first()).before(plaats);
    $($("li").last()).after("Weer 3: " + lijn);
    
});