import mongoose from 'mongoose';
import PointSchema from './utils/PointSchema';

const MessageSchema = new mongoose.Schema({
  text: String,
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  user: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', MessageSchema);
