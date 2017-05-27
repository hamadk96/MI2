"use strict";


    $(document).ready(function () 
    { 
        //DE BODY ZAL LANGZAAM VERSCHIJNEN (3000 = 3 seconden)
        $("body").fadeIn(3000);
        
        //BIJ HET KLIKKEN VAN DE AFBEELDING
        $("#imga").click(function () 
        { 
            //GAAT DE AFBEELDING NA 3 SECONDEN VERDWIJNEN
            $(".imgOut").fadeOut(3000); 
        });
        
        
        
        //BIJ HET KLIKKEN VAN DE BUTTON
        $("#imgChange").click(function () 
        { 
            //GAAT HET VOLGENDE AFBEELDING VERSCHIJNEN
            $("#imga").attr("src", "http://img.mobypicture.com/ac9221b42e4852370dde2768686b999e_large.jpg"); 
        });
    });