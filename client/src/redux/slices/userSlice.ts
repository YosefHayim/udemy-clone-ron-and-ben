import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the user state
type UserState = {
  fullName: string;
  profilePic: string;
  email: string;
  bio: string;
  role: string;
  coursesBought: string[];
};

// Initial state with type definition
const initialState: UserState = {
  fullName: "",
  profilePic: "",
  email: "",
  bio: "",
  role: "",
  coursesBought: [],
};

// Create the slice
const userSlice = createSlice({
  name: "user", // Slice name
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setProfilePic: (state, action: PayloadAction<string>) => {
      state.profilePic = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    setEmailAddress: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setCoursesBought: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state.coursesBought.push(...action.payload);
      } else {
        state.coursesBought.push(action.payload);
      }
    },
    clearUser: (state) => {
      state.fullName = "";
      state.profilePic = "";
      state.email = "";
      state.bio = "";
      state.role = "";
      state.coursesBought = [];
    },
  },
});

// Export actions to use in the app
export const {
  setFullName,
  setProfilePic,
  setRole,
  setBio,
  setEmailAddress,
  setCoursesBought,
  clearUser,
} = userSlice.actions;

// Export the reducer to add it to the store
export default userSlice.reducer;
