import { HubConnection } from "@microsoft/signalr";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Chat, User } from "../../../types/types";

export interface MessageState {

    hubConnection: HubConnection | null
    messages: Chat[] | null,
    users: User[]
}

const initialState: MessageState = {

    messages: [],
    hubConnection: null,
    users: []
}

interface SendMessagePayload {
    UserId: string;
    ToUserId: string;
    Message: string;
}

export const SendMessageToUserAsync = createAsyncThunk("SendMessageToUserAsync", async ({ UserId, ToUserId, Message }: SendMessagePayload, thunkAPI) => {

    try {
        const response = await axios.post("http://localhost:5150/api/Chats/SendMessage", {
            UserId: UserId,
            ToUserId: ToUserId,
            Message: Message
        })
        return response.data;
    } catch (error: any) {

        return thunkAPI.rejectWithValue({
            error: error.response?.data?.message
        })
    }
})

const MessageSlice = createSlice({
    name: 'Message',
    initialState,
    reducers: {
        setHubConnection: (state, action: PayloadAction<HubConnection>) => {
            state.hubConnection = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addMessage: (state, action: PayloadAction<Chat>) => {
            state.messages?.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(SendMessageToUserAsync.fulfilled, _ => {

        });
    }
});
export const { setHubConnection, setUsers, addMessage } = MessageSlice.actions;
export default MessageSlice.reducer