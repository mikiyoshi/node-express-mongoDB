const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator'); // This is a validator module
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm  // Make a Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email!'],
    unique: true,
    lowercase: true, // miki@ginal.com.ca
    validate: [validator.isEmail, 'Please provide a valid email'] // check documentation validator // sample error: miki@miki, miki@miki.i
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // remove from password at result of postman "Get Users"
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function(el) {
        return el === this.password; // abc === abc
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// Password management
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash Algorithm
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12); // This is replace a password like a pass12345 to $2a$12$Nz0sdEBlUt/m6PcNaPKHBeUXFCJK0.0zO4eh5OavMXRoFvtIaCPx2

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // 1000sec
  next();
});

userSchema.pre(/^find/, function(next) {
  // REGEX 正規表現 /^find/
  // this points to the current query
  // this.find({ active: true });
  this.find({ active: { $ne: false } }); // $ne: false means not equal false = only true
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  // this.password
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    // console.log(this.passwordChangedAt, JWTTimestamp);
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp; // 100 < 200 is not true, 300 < 200 true
  }

  return false;
};

// Change the password
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex'); // crypto 隠れた, token 印、証拠

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min, time 60, 1000 sec

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
