var socket = io('https://trabalho-unisinos-douggass.c9users.io');

window.onload = function() {
    if(localStorage.getItem('nickname')) {
        document.getElementById('row_nickname').style.display = 'none';
    }
}

document.getElementById('submit').addEventListener('click', function() {
    if((document.getElementById('mensagem').value == "" || document.getElementById('mensagem').value == " ")){return;}
    if(!localStorage.getItem('nickname') && document.getElementById('nickname').value != "" && document.getElementById('nickname').value != " ") {salvarNickname();}
    
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
    document.getElementById('mensagens').innerHTML += '<div style="width: 100%; word-wrap: break-word;"><label style="' + b + ' text-transform: capitalize;">' + data.nickname + ': </label>' + data.msg + '</div>';
});

document.getElementById('mensagem').addEventListener("keyup", function(event) {
    if(document.getElementById('mensagem').value.length > 1 && event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

document.getElementById('nickname').addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        salvarNickname();
        document.getElementById('mensagem').focus();
    }
});

var salvarNickname = function() {
    localStorage.setItem('nickname', document.getElementById('nickname').value.toLowerCase());
    document.getElementById('row_nickname').style.display = 'none';
}