import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'; 
interface ApiResponse {
    success: boolean;
    message: string;
}

interface PayloadData {
    user_id: string;
    verification_code: string; 
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

export const verifyOtp = createAsyncThunk<
    ApiResponse,
    PayloadData,
    { rejectValue: string }
>('api/verifyOtp', async (payload, { rejectWithValue }) => {

    try {
        const response = await axios.post(
            'http://loyx-frontend-api-env.eba-pfczuc4v.eu-north-1.elasticbeanstalk.com/api/v1/users/email-verifications/verify',
            payload,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': '6c20f27d-1f96-4be9-ac5d-b582305474a6',
                },
            }
        );

        if (response.status !== 200) {
            const error = await response.data; 
            return rejectWithValue(error.message || 'Unknown error');
        }

        const data = response.data;
        return data;
    } catch (error: any) {
        return rejectWithValue('Failed to connect to the server');
    }
});

const verifyOtpSlice = createSlice({
    name: 'verifyOtp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default verifyOtpSlice.reducer;
