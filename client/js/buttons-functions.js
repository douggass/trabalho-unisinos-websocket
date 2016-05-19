document.getElementById('submit').addEventListener('click', function() {
    if((document.getElementById('mensagem').value == "" || document.getElementById('mensagem').value == " ")){document.getElementById('mensagem').value = ''; return;}
    
    var data = {
        'msg': document.getElementById('mensagem').value,
        'nickname': localStorage.getItem('nickname') ? localStorage.getItem('nickname') : 'Anônimo'};
        
    document.getElementById('mensagem').value = '';
    socket.emit('chat message', data);
});

document.getElementById('mensagem').addEventListener("keyup", function(event) {
    if(document.getElementById('mensagem').value.length > 1 && event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

document.getElementById('save-configuracoes').addEventListener('click', function() {
    salvarNickname();
});

document.getElementById('nickname').addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        salvarNickname();
    }
});

document.getElementById('configuracoes').addEventListener('click', function() {
    openFrame("frame_configuracoes");
});

document.getElementById('pessoas').addEventListener('click', function() {
    openFrame("frame_pessoas");
});

var salvarNickname = function() {
    var oldname = localStorage.getItem('nickname');
    localStorage.setItem('nickname', document.getElementById('nickname') ? document.getElementById('nickname').value.toLowerCase() : 'Anônimo');
    document.getElementById('frame_configuracoes').style.display = 'none';
    document.getElementById('all').style.display = 'none';
    document.getElementById('mensagem').disabled = false;
    socket.emit('new user', {nickname: localStorage.getItem('nickname'), oldname: oldname});
}

var openFrame = function(idFrame){
    document.getElementById(idFrame).style.display = 'block';
    document.getElementById('all').style.display = 'block';
    document.getElementById('mensagem').disabled = true;
}