var path = require("path"),
    port = process.env.PORT || 3000,
    express = require("express"),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', function(req, res){
	res.render('index');
});

io.on('connection', function (socket) {
    
    socket.on('new user', function(data) {
        io.emit('show user new', data);
    });
    
    socket.on('chat message', function(data) {
        io.emit('chat message', data);
        console.log(data);
        console.log(socket);
    });
    
    /*socket.on('disconnect', function(data){});*/
    
});

http.listen(port, function(){
  console.log('SERVER RUNNING ON PORT ' + port);
});
