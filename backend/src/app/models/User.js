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
    avatar_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
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

export default mongoose.model('User', UserSchema);
