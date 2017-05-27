"use strict";

        $(document).ready(function () 
        {
          
            //************** KLEINER MAKEN **************
            $("#kleiner").click(function () 
            {
                var grootte = parseFloat($("p").css("font-size"));
                    
                $("p").css("font-size", ((.8 * grootte) > 3 ? (.8 * grootte) : 3) + "px");
            });

            
            
            
            
            //************** GROTER MAKEN **************
            $("#groter").click(function () 
            {
                var grootte = parseFloat($("p").css("font-size"));
                        
                $("p").css("font-size",(1.2 * grootte) + "px");
                
            });
        });