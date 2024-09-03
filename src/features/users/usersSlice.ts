import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  filters: Record<FilterableFields, string>;
}

export type FilterableFields = "name" | "username" | "email" | "phone";

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ field: FilterableFields; value: string }>
    ) => {
      state.filters[action.payload.field] = action.payload.value;
      state.filteredUsers = state.users.filter((user) =>
        Object.keys(state.filters).every((key) =>
          user[key as keyof User]
            ?.toString()
            .toLowerCase()
            .includes(
              state.filters[key as keyof UsersState["filters"]].toLowerCase()
            )
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setFilter } = usersSlice.actions;
export default usersSlice.reducer;