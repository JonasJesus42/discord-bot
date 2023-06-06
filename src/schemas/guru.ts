import {model , Schema} from 'mongoose';

interface IGuru {
    name: string;
    guildId: string;
    inAttendance: boolean;
}

const guruSchema = new Schema({
    name: String,
    guildId: {
        type: String,
        unique: true
    },
    inAttendance: Boolean,
});

export const Guru = model<IGuru>('Guru', guruSchema);