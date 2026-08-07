import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderAPI } from '../services/api';

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
    async (orderData, { rejectWithValue }) => {
        try {
            const { data } = await orderAPI.create(orderData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await orderAPI.getAll();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
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
