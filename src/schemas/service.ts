import { model, Schema } from 'mongoose';

export interface IService {
    name: string;
    guildId: string;
    waitingService: boolean;
    typeSupport: string;
    guruId?: string;
}

const serviceSchema = new Schema<IService>({
    name: String,
    guildId: "string",
    waitingService: Boolean,
    typeSupport: String,
    guruId: {
        type: String,
        unique: true,
        validate: {
            validator: async function (value: any): Promise<boolean> {
                const count = await model('service').countDocuments({ guruId: value });
                return count === 0;
            },
            message: 'Já existe um atendimento com este guruId.'
        }
    }
})

export const Service = model<IService>('Service', serviceSchema);