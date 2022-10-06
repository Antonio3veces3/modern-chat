var socket = io();

let params = new URLSearchParams( window.location.search);
if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('The name and room on param is required');
}


let user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(res){
        console.log(res);
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

    console.log('Servidor:', mensaje);

});
socket.on('personList', function(userList) {
    console.log(userList);
});

socket.on('privateMessage', function(message){
    console.log(message);
});