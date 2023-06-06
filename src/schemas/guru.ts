import {model , Schema} from 'mongoose';

const guruSchema = new Schema({
    name: String,
    guildId: {
        type: String,
        unique: true
    },
    inAttendance: Boolean,
});

export const Guru = model('Guru', guruSchema);