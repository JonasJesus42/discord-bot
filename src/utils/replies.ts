import { InteractionReplyOptions, WebhookMessageEditOptions } from 'discord.js';

export const Colors = {
  error: 0xff0000,
  success: 0x00ff00,
};

export const Reply = {
  error: (msg: string): InteractionReplyOptions => {
    return {
      ephemeral: true,
      embeds: [
        {
          color: Colors.error,
          description: msg,
        },
      ],
    };
  },
};

export const EditReply = {
  error: (msg: string): WebhookMessageEditOptions => {
    return {
      embeds: [
        {
          color: Colors.error,
          description: msg,
        },
      ],
    };
  },
  success(msg: string) {
    return {
      embeds: [
        {
          color: Colors.success,
          description: msg,
        },
      ],
    };
  },
};
