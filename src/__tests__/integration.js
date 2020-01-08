const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');

const { constructTestServer } = require('./__utils');

const { mockStore } = require('../datasources/__tests__/user');

const CHECK_USER_NAME = gql`
    query UsernameAvailable($username: String!) {
        isUsernameAvailable(username: $username)
    }
`;

const CREATE_USER = gql`
    mutation CreateUser($username: String!, $password: String!, $phoneNumber: String!, $verificationCode: String!) {
       createUser(username: $username, password: $password,phoneNumber: $phoneNumber,verificationCode: $verificationCode)
    }
`;

describe('Queries', () => {
    it('fetches user from username', async () => {
        const { server, userAPI } = constructTestServer({
            context: () => ({ user: { id: 1, username: 'test', password:'test@123', phoneNumber:'9876543210',verificationCode:'2344' } }),
          });

          userAPI.store = mockStore;

          const { query } = createTestClient(server);
          const res = await query({ query: CHECK_USER_NAME, variables: { username: "test" } });
          expect(res.data.isUsernameAvailable) == true;
    })
});

describe('Mutations', () => {
    it('returns message on create user', async () => {
      const { server, userAPI } = constructTestServer({
        context: () => {},
      });
  
      userAPI.store = mockStore;
    
      const { mutate } = createTestClient(server);
      const res = await mutate({
        mutation: CREATE_USER,
        variables: { username: 'test1', password:'test@1234', phoneNumber:'9876344543210',verificationCode:'2344' },
      });
      expect(res).toMatchSnapshot();
    });
});
