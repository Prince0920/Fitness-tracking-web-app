const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const AppleUserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: false,
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is Required',
    validate: {
      validator: function (value) {
        return value.length >= 6;
      },
      message: 'Password should have a minimum length of 6 characters.',
    },
  },
  email: {
    type: String,
    unique: true,
    // match: [/.+@.+\..+/],
    validate: {
      validator: function (value) {
        // Regular expression for email validation
        return /.+@.+\..+/.test(value);
      },
      message: 'Email address is not valid.',
    },
  },
  appleId: {
    type: String,
    trim: true,
    unique: true,
    required: 'Apple Id is Required',
  },
});

// hash user password
AppleUserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
AppleUserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const AppleUser = model('AppleUser', AppleUserSchema);

module.exports = AppleUser;
