const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const UserAPI = require('./datasources/user');

const internalEngineDemo = require('./engine-demo');

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  userAPI: new UserAPI({ store }),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  engine: {
    apiKey: 'service:TestExample:KSinFZKtQYvGYTTSPtjUHQ',
    ...internalEngineDemo,
  },
  playground: true,
  introspection: true,
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test')
  server
    .listen()
    .then(({ url }) => console.log(`🚀 app running at ${url}`));

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  UserAPI,
  store,
  server,
};
