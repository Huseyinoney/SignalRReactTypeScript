import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
    isAuth: boolean,
    user: {
        id: string | null,
        name: string | null,
        connectionId:string |null
    },
    Message: string | null
}

interface APIPayloadFulfilled {
    user: {
        id: string,
        name: string,
        connectionId:string
    },
    message: string
}

const initialState: AuthState = {
    isAuth: false,
    user: {
        id: null,
        name: null,
        connectionId:null
    },
    Message: null
}

export const RegisterAsync = createAsyncThunk("RegisterAsync", async (Username: string, thunkAPI) => {

    try {
        const response = await axios.post("http://localhost:5150/api/Auth/Register", {
            Name: Username,
        })
        return response.data;
    } catch (error: any) {

        return thunkAPI.rejectWithValue({
            error: error.response?.data?.message
        })
    }

})

export const LoginAsync = createAsyncThunk("LoginAsync", async (Username: string, thunkAPI) => {

    try {
        const response = await axios.post("http://localhost:5150/api/Auth/Login", {
            Name: Username
        });
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.message
        });
    }
});
export const LogOutAsync = createAsyncThunk("LogOutAsync", async (Name: string, thunkAPI) => {

    try {
        const response = await axios.post("http://localhost:5150/api/Auth/LogOut", {
            Name:Name

        });
        return response.data;
    } catch (error: any) {
        console.log(error)
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.message
        });
    }
});


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ClearOldMessageState: (state) => {
            state.Message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterAsync.fulfilled, (state, action: PayloadAction<APIPayloadFulfilled>) => {
            state.isAuth = false;
            state.user.id = null;
            state.user.name = null;
            state.Message = action.payload.message;
        });
        builder.addCase(RegisterAsync.rejected, (state, action: PayloadAction<any>) => {
            state.isAuth = false;
            state.user.id = null;
            state.user.name = null;
            state.Message = action.payload.error

        });
        builder.addCase(LoginAsync.fulfilled, (state, action: PayloadAction<APIPayloadFulfilled>) => {
            state.isAuth = true;
            state.user.id = action.payload.user.id;
            state.user.name = action.payload.user.name;
            state.user.connectionId = action.payload.user.connectionId
            state.Message = action.payload.message;
        });
        builder.addCase(LoginAsync.rejected, (state, action: PayloadAction<any>) => {
            state.isAuth = false;
            state.user.id = null;
            state.user.name = null;
            state.user.connectionId = null;
            state.Message = action.payload.error;
            //console.log(state.Message)
            //console.log(action.payload)
        });
        builder.addCase(LogOutAsync.fulfilled, (state, action: PayloadAction<any>) => {
            state.isAuth = false;
            state.user.id = null;
            state.user.name = null;
            state.user.connectionId =null;
            state.Message = action.payload.message;
        });
        builder.addCase(LogOutAsync.rejected, (state, action: PayloadAction<any>) => {
            state.isAuth = false;
            state.user.id = null;
            state.user.name = null;
            state.Message = action.payload.error;


        });
    }
})

export const { ClearOldMessageState } = AuthSlice.actions
export default AuthSlice.reducer