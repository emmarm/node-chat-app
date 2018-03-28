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

socket.on('newLocationMessage', (message) => {
  const messageList = document.querySelector('#messages');
  const li = document.createElement('li');
  const a = document.createElement('a');

  li.innerText = `${message.from}: `;
  a.innerText = 'My current location';
  a.setAttribute('href', message.url);
  a.setAttribute('target', '_blank');

  li.appendChild(a);
  messageList.appendChild(li);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('[name="message"]').value
  }, (err) => console.log(err));
});

const locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation. Please upgrade to a newer version to use this feature.');
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => alert('Unable to fetch location.')
  );
});
