var assert = require('assert');

var engine = function(){

    // return all combinations of a hand
    var handCombinations = function(set, k) {
        var i, j, combs, head, tailcombs;

        if (k > set.length || k <= 0) {
            return [];
        }

        if (k == set.length) {
            return [set];
        }

        if (k == 1) {
            combs = [];
            for (i = 0; i < set.length; i++) {
                combs.push([set[i]]);
            }
            return combs;
        }

        // Assert {1 < k < set.length}
        combs = [];
        for (i = 0; i < set.length - k + 1; i++) {
            head = set.slice(i, i+1);
            tailcombs = handCombinations(set.slice(i + 1), k - 1);
            for (j = 0; j < tailcombs.length; j++) {
                combs.push(head.concat(tailcombs[j]));
            }
        }
        return combs;
    };

    // return array with the cards rank (sorted)
    var cardRanks = function(hand) {
        var ranks = hand.map(function(card){
            var rank = parseInt(card[0]);
            // convert royals to numbers
            if (Number.isNaN(rank)){
                rank = parseInt(card[0].replace('T', '10').replace('J','11').replace('Q','12').replace('K','13').replace('A', 14));
            }

            if (arraysEqual(ranks, [14, 5, 4, 3, 2])){
                return [5, 4, 3, 2, 1];
            }
            else {
                return rank;
            }
        });

        ranks.sort(sortDesc);

        return ranks;
    };

    // return True if the hand contains a flush
    var flush = function (hand) {
        var suits = hand.map(function(card){
            return card[1];
        });
        suits.sort();
        return suits[0] === suits[suits.length-1];
    };

    var straight = function (ranks) {
        return ranks[0] - ranks[4] === 4;
    };

    // return the number of the matched 3/4 kind, else return false
    var kind = function (n, ranks) {
        for (var i =0; i < ranks.length; i++) {
            var number = ranks[i];
            var count = ranks.filter(function(rank) {
                return rank == number;
            }).length;
            if (count === n ){
                return number;
            }
        }
        return false;
    };

    // If there are two pair here, return the two ranks of the two pairs, else false
    var twoPair = function(ranks) {
        var highPair = kind(2, ranks);
        if (!highPair) {
            return false;
        }
        else {
            ranks.sort(sortAsc);
            var lowPair = kind(2,ranks);

            if (lowPair != highPair){
                return [highPair, lowPair];
            }
            else {
                return false;
            }
        }
    };

    // helper function to check if array content if equal (won't work for hands with inner arrays yet)
    var arraysEqual = function (a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    var sortDesc = function(a,b){
            return b - a;
    };

    var sortAsc = function(a,b){
        return a - b;
    };

    this.testEngine = function(){
        console.log('starting engine tests');
        //Test cases for the functions in poker program
        var straightFlush1 = ['6C', '7C', '8C', '9C', '9C', 'TC', 'KD']; //Straight Flush
        var straightFlush2 = ['6D', '7D', '8D' ,'9D' ,'TD']; //Straight Flush
        var fourKind = ['9D', '9H', '9S', '9C', '7D']; //Four of a Kind
        var fullHouse = ['TD', 'TC', 'TH', '7C', '7D']; //Full House
        var twoPairs = ['5D', '2C', '2H', '9H', '5C']; //Two Pair

         // testing handCombinations - result should be 21: C (7,5) = 21
        assert(handCombinations(straightFlush1, 5).length === 21, "handCombinations failed");

        // Testing card_ranks
        assert(arraysEqual(cardRanks(straightFlush2), [10, 9, 8, 7, 6]), "cardRanks failed") ;
        assert(arraysEqual(cardRanks(fullHouse), [10, 10, 10, 7, 7]), "cardRanks failed") ;

        // Testing flush
        assert(flush(straightFlush2), "flush check failed" );
        assert(flush(fullHouse) == false, "flush check failed" );

        // Testing straight
        assert(straight(cardRanks(straightFlush2)), "straight check failed" );
        assert(straight(cardRanks(fourKind))  == false, "straight check failed" );

        // Testing kind
        assert(kind(4,cardRanks(fourKind)) === 9, "kind check failed" );
        assert(kind(3,cardRanks(fullHouse)) === 10, "kind check failed" );
        assert(kind(3,cardRanks(straightFlush2)) === false, "kind check failed" );

        // Testing two pair
        assert(arraysEqual(twoPair(cardRanks(twoPairs)),[5, 2]), "two pairs check failed" );
        assert(twoPair(cardRanks(straightFlush2)) === false , "two pairs check failed" );

        // assert kind(3, card_ranks(sf1)) == None
         //assert kind(4, card_ranks(fk)) == 9
//
//        // Testing allmax
//         assert allmax([2,4,7,5,1]) == [7]
//         assert allmax([2,4,7,5,7]) == [7,7]
//         assert allmax([2]) == [2]
//         assert allmax([0,0,0]) == [0,0,0]
//

//    // Testing hand rank
//         assert hand_rank(sf1) == (8,10)
//         assert hand_rank(fk) == (7,9,7)
//         assert hand_rank(fh) == (6,10,7)
//
//    // Testing hand rank alt
//         assert hand_rank_alt(sf1) == (8, (10,9,8,7,6))
//         assert hand_rank_alt(fk) == (7,(9,7))
//         assert hand_rank_alt(fh) == (6,(10,7))
//
//    // Testing hand rank table
//         assert hand_rank_table(sf1) == (9, (10,9,8,7,6))
//         assert hand_rank_table(fk) == (7,(9,7))
//         assert hand_rank_table(fh) == (6,(10,7))
//
//    // Testing poker
//         assert poker([sf1, fk, fh]) == [sf1]
//         assert poker([fk, fh]) == [fk]
//         assert poker([fh, fh]) == [fh, fh]
//         assert poker([fh]) == [fh]
//         assert poker([sf2] + 99*[fh]) == [sf2]
//         assert poker([sf1, sf2, fk, fh]) == [sf1, sf2]

        console.log('all engine tests passed');
    }
};

 module.exports = engine;