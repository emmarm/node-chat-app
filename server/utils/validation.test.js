const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should validate valid string', () => {
    const res = isRealString('Valid string');

    expect(res).toBeTruthy();
  });

  it('should return false for string with only spaces', () => {
    const res = isRealString('  ');

    expect(res).toBeFalsy();
  });

  it('should return false for non-string values', () => {
    const res = isRealString(15);

    expect(res).toBeFalsy();
  });
});
