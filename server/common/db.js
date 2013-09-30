//mongodb://poker:xce4Dfg3Sf@paulo.mongohq.com:10094/poker
//mongo paulo.mongohq.com:10094/poker -u poker -p xce4Dfg3Sf
var mongoose = require('mongoose');

exports.mongoose = mongoose;

// Database connect
var uristring =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://poker:xce4Dfg3Sf@paulo.mongohq.com:10094/poker';

var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Successfully connected to: ' + uristring);
    }
});