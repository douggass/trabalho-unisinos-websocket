window.onload = function() {
    document.getElementById('mensagem').disabled = false;
    if(!localStorage.getItem('nickname')) {
        document.getElementById('frame_configuracoes').style.display = 'block';
        document.getElementById('all').style.display = 'block';
        document.getElementById('mensagem').disabled = true;
    } else {
        document.getElementById('nickname').value = localStorage.getItem('nickname');
        socket.emit('new user', {nickname: localStorage.getItem('nickname'), oldname: localStorage.getItem('nickname')});
    }
}