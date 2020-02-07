import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('File', FileSchema);
