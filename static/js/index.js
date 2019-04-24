var socket = io()

socket.on('connect', function() {

  socket.emit('newUser')
  document.getElementById('test').focus()
})

socket.on('update', function(data) {
  var chat = document.getElementById('chat')
 
  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''

  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)
})
function press() {
    if (event.keyCode === 13) {
        send();
    }
}

function send() {
  
  var message = document.getElementById('test').value
  
  document.getElementById('test').value = ''

  var chat = document.getElementById('chat')
  var msg = document.createElement('div')
  var node = document.createTextNode(message)
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)

  socket.emit('message', {type: 'message', message: message})
}