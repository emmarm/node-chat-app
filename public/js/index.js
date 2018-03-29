const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  const messageList = document.querySelector('#messages');
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    time: formattedTime
  });

  messageList.insertAdjacentHTML('beforeend', html);
});

socket.on('newLocationMessage', (message) => {
  const messageList = document.querySelector('#messages');
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.querySelector('#location-message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    time: formattedTime,
    link: message.url
  });

  messageList.insertAdjacentHTML('beforeend', html);
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
