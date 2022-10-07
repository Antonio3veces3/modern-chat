let paramsJQuery = new URLSearchParams(window.location.search);

let username = paramsJQuery.get('nombre');
let room = paramsJQuery.get('sala');
//REFERENCIAS JQUERY
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMsg = $('#txtMsg');
let divChatbox = $('#divChatbox');
let nameRoom = $('#titleRoom');

//Renderizar nombre de la sala
function renderNameRoom(name){
  let title = ``;
  if(name!=''){
    title+=`<small>${name}</small>`
  }else{
    title+=`<small>General</small>`
  }

  nameRoom.append(title)
};

//FUNCIONES PARA RENDERIZAR USUARIOS
function renderizarUsers(persons) {
  let html = `
    <li>
    <a href="javascript:void(0)" class="active"> Chat de <span> ${paramsJQuery.get(
      "sala"
    )}</span></a>
    </li>
    `;

  for (let i = 0; i < persons.length; i++) {
    html += `
        <li>
        <a data-id=${persons[i].id} href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persons[i].name} <small class="text-success">online</small></span></a>
        </li>
        `;
  }

  divUsuarios.html(html);
}

function renderMessages(message, sender){
  let date = new Date(message.date);
  let time = date.getHours() + ' : '+ date.getMinutes();
  let adminClass = (message.name === 'Admin')?'danger':'info';

  let html =  ``;
  if(sender){
    html+=`
    <li class="reverse">
      <div class="chat-content">
          <h5>${message.name}</h5>
          <div class="box bg-light-inverse">${message.message}</div>
      </div>
      <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
      <div class="chat-time">${time}</div>
  </li>
    `;
  }else{
    html+= `<li class="animated fadeIn">`
    if(message.name !== 'Admin'){
      html+=
      ` <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
      `
    }
    html+= `
        <div class="chat-content">
        <h5>${message.name}</h5>
        <div class="box bg-light-${adminClass}">${message.message}</div>
      </div>
      <div class="chat-time">${time}</div>
    </li>
    `
  }
  

  divChatbox.append(html);
}

function scrollBottom() {

  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}


//Listeners
divUsuarios.on('click', 'a', function(){
  let id = $(this).data('id');
  if(id){
    console.log(id);
  }
})

formEnviar.on('submit', (e)=>{
  e.preventDefault();
  if(txtMsg.val().trim().length===0){
    return;
  }

  socket.emit('createMessage',{
    name: username,
    message: txtMsg.val()
  },
  function(message){
    txtMsg.val('').focus;
    renderMessages(message, true);
    scrollBottom();
  })
})

