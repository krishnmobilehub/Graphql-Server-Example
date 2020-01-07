const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    isUsernameAvailable: async (_, { username }, { dataSources }) => {
       const result = await dataSources.userAPI.findUserByUserName(username)
       return result ? true : false;
    },
    initiatePhoneNumberVerification: async (_, { phoneNumber, code }, { dataSources }) => {
       const result = await dataSources.userAPI.phoneNumberVerification(phoneNumber, code)
       return result ? true : false;
    }
  },
  Mutation: {
    createUser: async (_, { username, password, phoneNumber, verificationCode }, { dataSources }) => {
      const result = await dataSources.userAPI.createUser(username, password, phoneNumber, verificationCode);
      return result ? "Success" : "Failed";
    },
  }
};
