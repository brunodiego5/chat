import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    name: String,
    path: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

/* campo virtual para retornar a url pronta */
FileSchema.virtual('url').get(function() {
  return `http://localhost:3333/files/${this.path}`;
});

export default mongoose.model('File', FileSchema);
