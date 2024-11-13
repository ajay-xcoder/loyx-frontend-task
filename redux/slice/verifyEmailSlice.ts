import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'; 

interface ApiResponse {
    success: boolean;
    message: string;
}

interface PayloadData {
    user_id: string;
    user_email: string;
}

interface ApiState {
    data: ApiResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    data: null,
    loading: false,
    error: null,
};

export const verifyEmail = createAsyncThunk<
    ApiResponse,
    PayloadData,
    { rejectValue: string }
>('api/verifyEmail', async (payload, { rejectWithValue }) => {

    try {
        const response = await axios.post(
            'http://loyx-frontend-api-env.eba-pfczuc4v.eu-north-1.elasticbeanstalk.com/api/v1/users/email-verifications',
            payload, 
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': '6c20f27d-1f96-4be9-ac5d-b582305474a6',
                },
            }
        );

        return response.data;

    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(error.response.data.message || 'Unknown error');
        } else {
            return rejectWithValue('Failed to connect to the server');
        }
    }
});

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default verifyEmailSlice.reducer;
