const UserAPI = require('../user');

const mockStore = {
    users: {
      find: jest.fn(),
      create: jest.fn(),
    },
  };
  module.exports.mockStore = mockStore;

const ds = new UserAPI({ store: mockStore });
ds.initialize({ context: { user: { id: 1, username: 'test', password:'test@123', phoneNumber:'9876543210',verificationCode:'2344' } } });

describe('[UserAPI.findUserByUserName]', () => {
    it('returns null for invalid username', async () => {
      const res = await ds.findUserByUserName("test");
      expect(res).toMatchSnapshot();
    });  
});

describe('[UserAPI.getUserById]', () => {
    it('looks up user by userId', async () => {
      const res = await ds.getUserById("1");
      expect(res).toMatchSnapshot();
    });
  
    it('returns empty array if nothing found', async () => {
      const res = await ds.getUserById("1");
      expect(res).toMatchSnapshot();
    });
  });