import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
  mode: string;
//   user: any | null;
//   token: string | null;
//   posts?: any[];
};

export type actionType = {
  payload: any;
  type: string;
};
const initialState: initialStateType = {
  mode: "dark", // see the system color pattern
//   user: null,
//   token: null,
//   posts: [],
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setMode: (state: initialStateType): void => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (state.mode === 'dark')
      {
        document.documentElement.classList.add('dark');
      }
      else 
      document.documentElement.classList.remove('dark');
    },
 
  },
});

export const { setMode} = stateSlice.actions;

export const getMode = (state :any) => state.state.mode; 
export default stateSlice.reducer;
