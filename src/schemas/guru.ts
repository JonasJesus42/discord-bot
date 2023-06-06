import {model , Schema} from 'mongoose';

const guruSchema = new Schema({
    name: String,
    userId: String,
    guildId: String,
    inAttendance: Boolean,
});

export const Guru = model('Guru', guruSchema);