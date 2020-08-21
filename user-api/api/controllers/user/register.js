module.exports = {
  friendlyName: 'Register',
  description: 'Register user.',
  inputs: {
    fullName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    }
  },
  exits: {},
  fn: async function(inputs) {

    // All done.
    return;

  }


};
