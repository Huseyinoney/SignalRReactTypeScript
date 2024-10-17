import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './features/Auth/AuthSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    }
})

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch

export default store