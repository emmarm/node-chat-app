const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate message body correctly', () => {
    const message = generateMessage('Person', 'Hi');

    expect(message.from).toBe('Person');
    expect(message.text).toBe('Hi');
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate location object correctly', () => {
    const locationMessage = generateLocationMessage('Person', 5, 10);

    expect(locationMessage.from).toBe('Person');
    expect(locationMessage.url).toBe('https://www.google.com/maps?q=5,10');
    expect(locationMessage.createdAt).toBeA('number');
  });
});
