const { io } = require('../server');
const Users = require('../classes/users');
const { createMessage } = require('../utilities/utilities');

const users = new Users();

io.on('connection', (client) => {
    console.log('Usuario conectado');
    
    client.on('enterChat', (user, callback)=>{
        if(!user.name || !user.room){
            return callback({
                error: true,
                message: `The name and room are required`
            });
        }

        client.join(user.room);

        users.addPerson(client.id, user.name, user.room);
        client.broadcast.to(user.room).emit('personList', users.getPersonByRoom(user.room));
        client.broadcast.to(user.room).emit('createMessage',createMessage('Admin', `${user.name} connected`));

        callback(users.getPersonByRoom(user.room),user.room);
    });

    client.on('createMessage', (data, callback )=>{
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
        callback(message);
    })

    client.on('disconnect', async() => {
        let person =  users.removePerson(client.id);

        client.broadcast.to(person.room).emit('createMessage',createMessage('Admin', `${person.name} disconnected`));
        

        client.broadcast.to(person.room).emit('personList', users.getPersonByRoom(person.room));
    });
    
    client.on('privateMessage', (data)=>{
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    })

    client.on('searching', (data, callback)=>{
        const result = users.getSearchingPersons(data);
        callback(result)
    })

    client.on('getPersonList', (room, callback)=>{
        callback(users.getPersonByRoom(room));
    })


    
});