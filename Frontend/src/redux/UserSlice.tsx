import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ========== TYPES ==========
export interface User {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  address: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export type NewUser = Omit<User, 'id'>;

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const API_URL = 'http://localhost:5000/api/users';

// ========== FETCH ALL USERS ==========
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<User[]>(API_URL);
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Server Error';
      return rejectWithValue(message);
    }
  }
);

// ========== FETCH USER BY ID ==========
export const fetchUserByIdAsync = createAsyncThunk<User, number, { rejectValue: string }>(
  'user/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get<User>(`${API_URL}/${id}`);
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Server Error';
      return rejectWithValue(message);
    }
  }
);

// ========== ADD USER ==========
export const addUserAsync = createAsyncThunk<User, NewUser, { rejectValue: string }>(
  'user/addUserAsync',
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await axios.post<User>(API_URL, newUser, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Server Error';
      return rejectWithValue(message);
    }
  }
);

// ========== UPDATE USER ==========
export const updateUserAsync = createAsyncThunk<User, User, { rejectValue: string }>(
  'user/updateUserAsync',
  async (updatedUser, { rejectWithValue }) => {
    try {
      const res = await axios.patch<User>(`${API_URL}/${updatedUser.id}`, updatedUser, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Server Error';
      return rejectWithValue(message);
    }
  }
);

// ========== DELETE USER ==========
export const deleteUserAsync = createAsyncThunk<number, number, { rejectValue: string }>(
  'user/deleteUserAsync',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Server Error';
      return rejectWithValue(message);
    }
  }
);

// ========== SLICE ==========
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      })

      // FETCH BY ID
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const existing = state.users.find(u => u.id === action.payload.id);
        if (existing) {
          // update existing if already in store
          Object.assign(existing, action.payload);
        } else {
          // otherwise push new
          state.users.push(action.payload);
        }
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      })

      // ADD
      .addCase(addUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      })

      // UPDATE
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      })

      // DELETE
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter(u => u.id !== action.payload);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      });
  },
});

export default userSlice.reducer;
