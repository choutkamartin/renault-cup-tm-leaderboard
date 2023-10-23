import mongoose from "mongoose";

export interface Records extends mongoose.Document {
  accountId: string;
  mapId: string;
  time: number;
  updatedAt: Date;
}

const RecordSchema = new mongoose.Schema<Records>({
  accountId: {
    type: String,
  },
  mapId: {
    type: String,
  },
  time: {
    type: Number,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.models.Record ||
  mongoose.model<Records>("Record", RecordSchema);
