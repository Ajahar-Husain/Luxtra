import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    orderCreationLoading: false,
    orderCreationError: null,
    orderCreationSuccess: false,
    lastCreatedOrder: null,
};

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, { getState, rejectWithValue }) => {
        try {
            const { user } = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMyOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { user } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get('http://localhost:5000/api/orders/mine', config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrderCreation: (state) => {
            state.orderCreationSuccess = false;
            state.lastCreatedOrder = null;
            state.orderCreationError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.orderCreationLoading = true;
                state.orderCreationError = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderCreationLoading = false;
                state.orderCreationSuccess = true;
                state.lastCreatedOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.orderCreationLoading = false;
                state.orderCreationError = action.payload;
            })
            // Fetch My Orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrderCreation } = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrderCreationLoading = (state) => state.orders.orderCreationLoading;
export const selectOrderCreationSuccess = (state) => state.orders.orderCreationSuccess;
export const selectLastCreatedOrder = (state) => state.orders.lastCreatedOrder;

export default orderSlice.reducer;
