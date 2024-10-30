import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { AppDispatch } from '../../store';
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

    // newConnection.on("ReceivedMessage", (message: string) => {
    //     dispatch(addMessage(message));
    // });

    newConnection.on("SendMessageToUser", (chat: Chat) => {
        
            //dispatch(addMessage(chat.message + " " + new Date(chat.date).getHours().toString().padStart(2, '0') + ":" + new Date(chat.date).getMinutes().toString().padStart(2, '0')));
            dispatch(addMessage(chat))
        
    });

    try {
        await newConnection.start();
        dispatch(setHubConnection(newConnection));
        newConnection.invoke("Connect", userId);
    } catch (error) {
        console.error("Connection failed: ", error);
    }
};
