//var socket = io('https://trabalho-unisinos-douggass.c9users.io');
var socket = io();

window.onload = function() {
    document.getElementById('mensagem').disabled = true;
    definirNome();
    if(localStorage.getItem('nickname')) {
        document.getElementById('row_nickname').style.display = 'none';
        document.getElementById('all').style.display = 'none';
        document.getElementById('mensagem').disabled = false;
        socket.emit('new user', {nickname: localStorage.getItem('nickname'), statusUser: 'online'});
    }
}

document.getElementById('submit').addEventListener('click', function() {
    if((document.getElementById('mensagem').value == "" || document.getElementById('mensagem').value == " ")){document.getElementById('mensagem').value = ''; return;}
    
    var data = {
        'msg': document.getElementById('mensagem').value,
        'nickname': localStorage.getItem('nickname') ? localStorage.getItem('nickname') : 'Anônimo'};
        
    document.getElementById('mensagem').value = '';
    socket.emit('chat message', data);
});

socket.on('chat message', function(data) {
    var b = '';
    if (data.nickname == localStorage.getItem('nickname')) {b = ' font-weight: bold; ';}
    window.scrollTo(0,document.body.scrollHeight);
    document.getElementById('mensagens').innerHTML += '<div style="width: 100%; word-wrap: break-word; padding: 2px 1px;"><label style="' + b + ' text-transform: capitalize;">' + data.nickname + ': </label>' + data.msg + '</div>';
});

document.getElementById('mensagem').addEventListener("keyup", function(event) {
    if(document.getElementById('mensagem').value.length > 1 && event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

document.getElementById('save-name').addEventListener('click', function() {
    salvarNickname();
});

document.getElementById('nickname').addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        salvarNickname();
    }
});

var salvarNickname = function() {
    localStorage.setItem('nickname', document.getElementById('nickname') ? document.getElementById('nickname').value.toLowerCase() : 'Anônimo');
    document.getElementById('row_nickname').style.display = 'none';
    document.getElementById('all').style.display = 'none';
    document.getElementById('mensagem').disabled = false;
    socket.emit('new user', {nickname: localStorage.getItem('nickname'), statusUser: 'online'});
}

var definirNome = function(nome) {
    document.getElementById('meu-nome').innerHTML = (localStorage.getItem('nickname')) ? localStorage.getItem('nickname') : 'Anônimo';
}

socket.on('show user new', function(data) {
    //console.log(data);
    if(data.nickname != localStorage.getItem('nickname')) {
        document.getElementById('new-user').style.display = 'block'
        document.getElementById('new-user').innerHTML = '<label style="text-transform: capitalize;">' + data.nickname + '</label> está ' + data.statusUser;
        setTimeout(function(){ document.getElementById('new-user').style.display = 'none'; }, 3000);
    }
});