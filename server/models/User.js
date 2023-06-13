const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: false,
    required: 'Username is Required',
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
  height: {
    type: Number,
    trim: true,
    default: 0,
  },
  weight: {
    type: Number,
    trim: true,
    default: 0,
  },
  age: {
    type: Number,
    trim: true,
    default: 0,
  },
  cardio: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cardio',
    },
  ],
  resistance: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Resistance',
    },
  ],
});

// hash user password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
