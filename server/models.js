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
//var user = new userModel({
//    username:'eran',
//    email:'shush6@gmail.com',
//    password:'1234'
//});
//
//user.save( function( err ) {
//    if( !err ) {
//        return console.log( 'created' );
//    } else {
//        return console.log( err );
//    }
//});
