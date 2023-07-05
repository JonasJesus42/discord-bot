import { model, Schema } from 'mongoose';

export interface IGuru {
  name: string;
  guildId: string;
  inAttendance: boolean;
}

const guruSchema = new Schema<IGuru>({
  name: String,
  guildId: {
    type: String,
    unique: true,
  },
  inAttendance: Boolean,
});

export const Guru = model<IGuru>('Guru', guruSchema);
