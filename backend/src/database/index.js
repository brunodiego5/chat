import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoconnection = mongoose.connect(
      'mongodb+srv://brunodiego5:brunodiego5@cluster0-fwtlo.mongodb.net/chat?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    );
  }
}

export default new Database();
