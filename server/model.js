var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    nickname: String,
    socketId: String,
    img1: { data: Buffer, contentType: String }
});
module.exports = mongoose.model('User', userSchema);