const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
  const messageList = document.querySelector('#messages');
  const listItem = document.createElement('li');
  listItem.innerText = `${message.from}: ${message.text}`;

  messageList.appendChild(listItem);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('[name="message"]').value
  }, (err) => console.log(err));
});
