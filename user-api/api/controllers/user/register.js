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
  exits: {
    success: {
      statusCode: 201,
      description: 'New user created.'
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use.'
    },
    error: {
      description: 'An error occurred.'
    },
  },
  fn: async function(inputs) {
    return;
  }
};
