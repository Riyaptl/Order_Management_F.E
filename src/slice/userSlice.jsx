import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSRDetails } from "../service/userService";

export const getSRDetails = createAsyncThunk(
  "user/getDetails",
  async (thunkAPI) => {
    try {
      return await fetchSRDetails();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    srs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSRDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSRDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.srs = action.payload;
      })
      .addCase(getSRDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }); 
  },
});

export default userSlice.reducer;
