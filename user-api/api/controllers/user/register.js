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
  fn: async function(inputs, exits) {
    try {

      const newEmailAddress = inputs.email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');

      let newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
        accountProofToken: token,
        accountProofTokenExpiresAt:
          Date.now() + sails.config.custom.accountProofTokenTTL,
      }).fetch();

      const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;
      console.log('Confirmation link: ', confirmLink);

      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Visit the confirmation link to verify.`,
      });

    } catch (error) {

      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Error:',
          error: 'This email address already exits',
        });
      } else {
        return exits.error({
          message: 'Error:',
          error: error.message,
        });
      }

    }
  }
};
