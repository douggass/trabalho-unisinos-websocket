var path = require("path"),
    port = process.env.PORT || 3000,
    express = require("express"),
    app = require('express')(),
    http = require('http').Server(app),
    mongoose = require('mongoose'),
    io = require('socket.io')(http);
    
var User = require('./server/model');

var listOfSockets = [];

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/', function(req, res){
	res.render('index');
});
io.on('connection', function (socket) {
    
    socket.on('new user', function(data) {
        User.update({nickname: data.oldname}, {nickname: data.nickname, socketId: socket.id}, { upsert: true }, function(err, data) {
            if(err)
                throw err;
        })
        
        User.find({}, function(err, dataQuery) {
            io.emit('update users', dataQuery);
        });
        
        io.emit('show user new', data);
    });
    
    socket.on('chat message', function(data) {
        io.emit('chat message', data);
    });
    
    socket.on('disconnect', function(data) {
        User.remove({socketId: socket.id}, function(err) {
            if(err)
                throw err;
                
            User.find({}, function(err, dataQuery) {
                io.emit('update users', dataQuery);
            });
        });
        
    });
});

//setup, configure, and connect to MongoDB
mongoose.connect('mongodb://' + process.env.IP);

http.listen(port, function(){
  console.log('SERVER RUNNING ON PORT ' + port);
});
