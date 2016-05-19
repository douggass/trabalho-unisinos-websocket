socket.on('show user new', function(data) {
    if(data.nickname != localStorage.getItem('nickname')) {
        document.getElementById('new-user').style.display = 'block'
        document.getElementById('new-user').innerHTML = '<label style="text-transform: capitalize;">' + data.nickname + '</label> está online';
        setTimeout(function(){ document.getElementById('new-user').style.display = 'none'; }, 3000);
    }
});

socket.on('chat message', function(data) {
    var classe = ' fr ';
    if (data.nickname == localStorage.getItem('nickname')) {classe = ' fl ';}
    window.scrollTo(0,document.body.scrollHeight);
    document.getElementById('mensagens').innerHTML += 
    '<div class="dialogo"><img src="./imagens/avatar.png" class="profile-img' +  classe + '"><div class="label' +  classe + '">' + data.msg + '</div></div><div style="clear: left"></div>';
});

socket.on('update users', function(data){
    document.getElementById('lista_pessoas').innerHTML = '';
    data.forEach(function(value) {
        document.getElementById('lista_pessoas').innerHTML += '<li>' + value.nickname + '</li>';
    });
});