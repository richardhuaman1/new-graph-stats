import { useSocket } from '@/context/socketContext';

export type SendType = 'send-data';

export interface SendDataDto {
  message: string;
}

type SubscriptionDtoMap = {
  'send-data': SendDataDto;
};

export function useSendMessage() {
  const socket = useSocket();

  const sendMessage = <K extends SendType>(
    subscription: K,
    dto?: SubscriptionDtoMap[K]
  ): void => {
    if (!socket) {
      // console.warn('⚠️ No hay conexión activa al socket');
      return;
    }

    try {
      socket.emit(subscription, dto);
    } catch (error) {
      // console.error(`❌ Error enviando evento "${subscription}"`, error);
    }
  };

  return { sendMessage };
}
