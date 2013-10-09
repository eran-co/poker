var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    PlayerSchema = require('./player').PlayerSchema;

// User schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    balance: { type: Number, min: 0, required: true },
    imageUrl: String,
    Player: {type: ObjectId, ref: PlayerSchema}
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    cb(null, candidatePassword === this.password );

//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//        if(err){
//            return cb(err);
//        }
//        cb(null, isMatch);
//    });
};

userSchema.methods.updateBalance = function(balance){
    this.balance = this.balance + balance;
}

// Export user model
var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;