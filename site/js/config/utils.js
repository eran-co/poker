define([
    'jquery',
    'underscore'
], function($, _){
   var utils = {
       getCardText: function(card){
           var rank = card.slice(0, card.length -1);
           var suit = card[card.length -1];
           switch (suit){
               case 'H':
                   suit = ' ♥';
                   break;
               case 'S':
                   suit = ' ♠';
                   break;
               case 'C':
                   suit = ' ♣';
                   break;
               case 'D':
                   suit = ' ♦';
                   break;
           };

           return rank +  ' <br>' + suit;
       }
   };

   return utils;
});
