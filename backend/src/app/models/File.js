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
  return `${process.env.APP_URL}/files/${this.path}`;
});

export default mongoose.model('File', FileSchema);
