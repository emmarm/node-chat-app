const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate message body correctly', () => {
    const message = generateMessage('Person', 'Hi');

    expect(message.from).toBe('Person');
    expect(message.text).toBe('Hi');
    expect(message.createdAt).toBeA('number');
  });
});
