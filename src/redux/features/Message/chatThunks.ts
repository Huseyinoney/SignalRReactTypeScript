// src/features/chat/chatThunks.ts
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { AppDispatch } from '../../store'; // Redux store'unuzun tiplerini kullanın
import { setHubConnection, setUsers, addMessage } from './MessageSlice';
import { Chat, User } from '../../../types/types';

export const createHubConnection = (userId: string) => async (dispatch: AppDispatch) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5150/chatHub")
    .configureLogging(LogLevel.Information)
    .build();

  newConnection.on("Users", (users: User[]) => {
    dispatch(setUsers(users));
  });

  newConnection.on("ReceivedMessage", (message: string) => {
    dispatch(addMessage(message));
  });

  newConnection.on("SendMessageToUser", (chat: Chat) => {
    console.log(chat);
    dispatch(addMessage(chat.message));
  });

  try {
    await newConnection.start();
    dispatch(setHubConnection(newConnection));
    newConnection.invoke("Connect", userId);
  } catch (error) {
    console.error("Connection failed: ", error);
  }
};
