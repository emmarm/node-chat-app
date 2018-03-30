const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Juan',
        room: 'A'
      },
      {
        id: 2,
        name: 'Tsu',
        room: 'A'
      },
      {
        id: 3,
        name: 'Sri',
        room: 'B'
      }
    ];
  });

  it('should add a user', () => {
    const oldUsers = new Users();
    const newUser = {
      id: 123,
      name: 'Vianne',
      room: 'Cuties'
    };
    oldUsers.addUser(newUser.id, newUser.name, newUser.room);

    expect(oldUsers.users).toEqual([newUser]);
  });

  it('should remove a user by ID', () => {
    const userId = 1;
    const removedUser = users.removeUser(userId);

    expect(removedUser).toEqual({
      id: 1,
      name: 'Juan',
      room: 'A'
    });
    expect(users.users.length).toBe(2);
  });

  it('should not remove user with invalid ID', () => {
    const userId = 123;
    const removedUser = users.removeUser(userId);

    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should get a user by ID', () => {
    const userId = 1;
    const gottenUser = users.getUser(userId);

    expect(gottenUser).toEqual({
      id: 1,
      name: 'Juan',
      room: 'A'
    });
  });

  it('should not find user with invalid ID', () => {
    const userId = 123;
    const gottenUser = users.getUser(userId);

    expect(gottenUser).toBeFalsy();
  });

  it('should return a list of users in room A', () => {
    const room = 'A';
    const namesList = users.getUserList(room);

    expect(namesList).toEqual(['Juan', 'Tsu']);
  });

  it('should return a list of users in room B', () => {
    const room = 'B';
    const namesList = users.getUserList(room);

    expect(namesList).toEqual(['Sri']);
  });
});
