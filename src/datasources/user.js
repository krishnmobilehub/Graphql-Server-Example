const { DataSource } = require('apollo-datasource');
const twilio = require('twilio')(
  'AC5004e8a8b1e490d9b98b60c051c28938',
  '784f7a3bb7d62ebfe87bcb60f9dcc2bc'
);

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findUserByUserName(usernameArg) { 
    const users = await this.store.users.find({ where: { username: usernameArg } });
    return users ? users : null;
  }

  async phoneNumberVerification(number, code) {
   try {
     const body = 'Testing Code!' + code;
     await twilio.messages.create({
       to: number,
       from: '+17866611934',
       body: body
     });
     return true
   } catch(error) {
     return false
   }
  }

  async createUser(usernameArg, passwordArg, phoneNumberArg, verificationCodeArg) {
    const users = await this.store.users.create({username: usernameArg, password: passwordArg, phoneNumber: phoneNumberArg, verificationCode: verificationCodeArg});
    return users ? users : null;
  }

  async getUserById(idArg) {
    const users = await this.store.users.find({ where: { id: idArg } });
    return users ? users : null;
  }
}

module.exports = UserAPI;
