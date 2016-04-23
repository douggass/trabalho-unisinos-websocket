var socket = io('https://trabalho-unisinos-douggass.c9users.io');

document.getElementById('submit').addEventListener('click', function() {
    var data = {
        'msg': document.getElementById('mensagem').value,
        'nickname': document.getElementById('nickname').value
    };
    document.getElementById('mensagem').value = '';
    gotoBottom('mensagens');
    socket.emit('chat message', data);
});

socket.on('chat message', function(data) {
    document.getElementById('mensagens').innerHTML += '<div style="wight: 100%; word-wrap: break-word;"><labe>' + data.nickname + ': </label>' + data.msg + '</div>';
});

document.getElementById('mensagem').addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        document.getElementById("submit").click();
    }
});

function gotoBottom(id){
   var element = document.getElementById(id);
   element.scrollTop = element.scrollHeight - element.clientHeight;
}