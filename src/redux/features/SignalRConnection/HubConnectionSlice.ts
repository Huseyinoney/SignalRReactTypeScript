import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HubConnection } from '@microsoft/signalr';

interface SignalRState {
  hubConnection: HubConnection | null;
}

const initialState: SignalRState = {
  hubConnection: null,
};

const signalRSlice = createSlice({
  name: 'signalR',
  initialState,
  reducers: {
    setHubConnection: (state, action: PayloadAction<signalR.HubConnection>) => {
      state.hubConnection = action.payload;
    },
    clearHubConnection: (state) => {
      if (state.hubConnection) {
        state.hubConnection.stop();  // Bağlantıyı durdur
      }
      state.hubConnection = null;
    }
  }
});

export const { setHubConnection, clearHubConnection } = signalRSlice.actions;
export default signalRSlice.reducer;
