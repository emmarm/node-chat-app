const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
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

  const messageInput = document.querySelector('[name="message"]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageInput.value
  }, () => messageInput.value = '');
});

const locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation. Please upgrade to a newer version to use this feature.');
  }

  locationButton.setAttribute('disabled', 'true');
  locationButton.innerText = 'Sending...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';
      alert('Unable to fetch location.');
    }
  );
});
