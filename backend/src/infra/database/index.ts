import mongoose, { Mongoose } from 'mongoose';

class Database {
  public connection!: Mongoose;

  async connect(url: string) {
    this.connection = await mongoose.connect(url);
  }
}

export const database = new Database();
