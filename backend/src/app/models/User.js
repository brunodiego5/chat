import mongoose from 'mongoose';
import PointSchema from './utils/PointSchema';

const UserSchema = new mongoose.Schema({
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
});

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('User', UserSchema);
