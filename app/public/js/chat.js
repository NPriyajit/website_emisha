var socket = io();





socket.on('connect', function(){
  var chatForm = document.forms.chatForm;
  if(chatForm){
    //var chatUsername = document.querySelector('#chat-username');
    var chatMessage = document.querySelector('#chat-message');

    chatForm.addEventListener('submit', function(e){
      e.preventDefault();
      socket.emit('postMessage',{
        
        message: chatMessage.value,
      });
      chatMessage.value='';
      chatMessage.focus();
    });
    socket.on('updateMessages', function(data){
      showMessage(data);
    });

  }
});




function showMessage(data){
  var c=0;
  //var exp;
  var chatDisplay = document.querySelector('.chat-display');
  var newMessage =document.createElement('p');
  var str=data.message; 
  var img='<img  style="border-radius:50px" src="http://localhost:3000/pic/utkal.jpg" width="50" height="50">'+'&nbsp &nbsp &nbsp &nbsp'+str;
  var botmsg='&nbsp &nbsp &nbsp &nbsp';
  var botpic='<img  style="border-radius:50px" src="http://localhost:3000/pic/botico.jpg" width="50" height="50">';
  
  var exprreq=["hello","hii","how are you","what are you doing","emisha","join","events","more"];
  var exprres=["hello world","hii sir how can I help you?","fine, thank you.","Nothing sir","Emisha is a platform to perform projects and get sharpen your programming skills.","you can join Emisha by registering to Hackathon","There are two events: first one UTKAL HACKS & second is NIPF","Thank you for requesting to know more about EMISHA, you can visit EMISHA website: getemisha.tech, and can know anything"];
  newMessage.className='bg-success chat-text';
  var low=str.toLowerCase();
  var upp=str.toUpperCase();
  var loclow=str.toLocaleLowerCase();
  var locupp=str.toLocaleUpperCase();
  for(var i=0; i<=exprreq.length;i++)
  {
     if(str.includes(exprreq[i]) || low.includes(exprreq[i]) || upp.includes(exprreq[i]) || loclow.includes(exprreq[i]) || locupp.includes(exprreq[i]))
       {
        newMessage.innerHTML = img+'<br>'+'<h3>'+exprres[i]+ botmsg+botpic;
        c=2;
       }

  }
 if(c!=2)
 {
 newMessage.innerHTML = img+'<h3>Sorry I am not able to answer this right now. &nbsp &nbsp &nbsp &nbsp ' + botpic;
 }
 
  chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}