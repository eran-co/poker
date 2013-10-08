var player = {
    seat:1,
    name: 'vick7',
    balance: 6363,
    imageUrl:'../img/faces/1.jpg',
    cards: ['8D','AS'],
    bet:0
}

var bets = {
    nextPlayerSeat: 2,
    amountToCall:0
}

var tableData = {
    smallBlind:10,
    bigBlind:20,
    pot:0,
    bet:0,
    seats: [],
    dealer: 3
}


// create user
//var userModel = require('./server/models/user').userModel;
//
var g = new Game({
    pot: 0,
    bet: 0,
    flop:[],
        turn: "",
        river: "",
        players: [],
        table: ObjectId("5252bc2892d9b9371b000001") ,
    dealer: 1
});
//
//user.save( function( err ) {
//    if( !err ) {
//        return console.log( 'created' );
//    } else {
//        return console.log( err );
//    }
//});

////create tables
//var TableModel = require('./server/models/table').TableModel;
//
//var table = new TableModel({
//    name: 'Starter',
//    smallBlind:10,
//    bigBlind:20,
//    activePlayers:2,
//    maxPlayers:6
//});
//
//table.save( function( err ) {
//    if( !err ) {
//        return console.log( 'created' );
//    } else {
//        return console.log( err );
//    }
//});

//var table2 = new TableModel({
//    name: 'Intermediate',
//    smallBlind:50,
//    bigBlind:100,
//    activePlayers:4,
//    maxPlayers:6
//});
//
//table2.save( function( err ) {
//    if( !err ) {
//        return console.log( 'created' );
//    } else {
//        return console.log( err );
//    }
//});
//
//var table3 = new TableModel({
//    name: 'Professional',
//    smallBlind:100,
//    bigBlind:200,
//    activePlayers:3,
//    maxPlayers:6
//});
//
//table3.save( function( err ) {
//    if( !err ) {
//        return console.log( 'created' );
//    } else {
//        return console.log( err );
//    }
//});
