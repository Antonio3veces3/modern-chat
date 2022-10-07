var socket = io();

let params = new URLSearchParams( window.location.search);
if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('The name and room on param is required');
}


let user = {
    name: params.get('nombre'),
    room: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(res, room){
        renderizarUsers(res);
        renderNameRoom(room)
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('reconnect',()=>{
    console.log('Reconecting..');
})

// Escuchar información
socket.on('createMessage', function(mensaje) {
    renderMessages(mensaje, false);
    scrollBottom();
});
socket.on('personList', function(userList) {
    renderizarUsers(userList);
});

socket.on('privateMessage', function(message){
    console.log(message);
});