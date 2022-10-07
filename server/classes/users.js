class Users {
    constructor(){
        this.persons = [];
    }   

   /* get getPersons(){
        return this.persons;
    }*/

    getPersons(){
        return this.persons;
    }

    addPerson( id, name, room){
        let newPerson = { id, name, room };
        
        this.persons.push(newPerson);
    }
    getPerson(id){
        let person = this.persons.filter( person => person.id === id)[0]; //Regresa un solo usuario encontrado en el array, , es decir, la posicion 0

        return person;
    }

    removePerson(id){
        let deletedUser = this.getPerson(id);
        this.persons=  this.persons.filter( person => 
            {
                return person.id != id //crea un nuevo Array con las personas que tengan un ID diferente al recibido
            }
        )
        return deletedUser;
    }

    getPersonByRoom(room){
        let usersRoom = this.persons.filter( person => person.room === room);
        return usersRoom;
    }
}

module.exports = Users;