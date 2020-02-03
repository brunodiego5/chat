import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import PointSchema from './utils/PointSchema';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    password_hash: String,
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, json) {
        delete json.password_hash;
        return json;
      },
    },
  }
);

UserSchema.virtual('password').set(function setPassword(password) {
  this.password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});

UserSchema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compare(password, this.password_hash);
};

/* UserSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password_hash')) {
    this.password_hash = bcrypt.hashSync(
      this.password_hash,
      bcrypt.genSaltSync(8)
    );
  }
  next();
}); */

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('User', UserSchema);
