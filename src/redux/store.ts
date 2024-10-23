import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './features/Auth/AuthSlice'
import HubConnectionSlice from './features/SignalRConnection/HubConnectionSlice'
import MessageSlice from './features/Message/MessageSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        signalR:HubConnectionSlice,
        Message:MessageSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,  // Serileştirme kontrolünü kapat
        })
})

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch

export default store