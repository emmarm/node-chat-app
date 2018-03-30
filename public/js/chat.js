const socket = io();

const scrollToBottom = () => {
  const messages = document.querySelector('#messages');
  const newMessage = messages.lastElementChild;
  const newMessageHeight = newMessage.getBoundingClientRect().height;
  let lastMessageHeight;
  const { clientHeight } = messages;
  const { scrollTop } = messages;
  const { scrollHeight } = messages;

  if (newMessage.previousElementSibling) {
    lastMessageHeight = newMessage.previousElementSibling.getBoundingClientRect().height;
  }

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
};

socket.on('connect', () => {
  const params = deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log(`User ${params.name} joined room ${params.room}`);
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  const userList = document.querySelector('#users');
  const ul = document.createElement('ul');

  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    ul.appendChild(li);
  });

  userList.innerHTML = ul.innerHTML;
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
  scrollToBottom();
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
  scrollToBottom();
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
