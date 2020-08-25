module.exports = {
  friendlyName: 'Forgot password',
  description: '',
  inputs: {
    email: {
      description:
        'The email address of the user who wants to recover their password.',
      example: 'test@gmail.com',
      type: 'string',
      required: true,
    },
  },
  exits: {
    success: {
      description:
        'Email matched a user and a recovery email might have been sent',
    },
  },
  fn: async function(inputs) {

    var user = await User.findOne({ email: inputs.email });
    if (!user) { return; }

    const token = await sails.helpers.strings.random('url-friendly');

    await User.update({ id: user.id }).set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt:
        Date.now() + sails.config.custom.passwordResetTokenTTL,
    });

    const recoveryLink = `${sails.config.custom.baseUrl}/user/reset-password?token=${token}`;

    return exits.success({
      message: `Password reset process has been initiated for ${newUser.email}. Visit the link to reset the password: ${recoveryLink}`,
    });
  }
};
