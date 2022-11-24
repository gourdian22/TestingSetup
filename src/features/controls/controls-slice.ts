import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Regions } from "types";

type ControlsSlice = {
  search: string;
  region: Regions | "";
};

const initialState: ControlsSlice = {
  search: "",
  region: "",
};

const controlsSlice = createSlice({
  name: "@@controls",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRegion: (state, action: PayloadAction<Regions | "">) => {
      state.region = action.payload;
    },
    clearControls: () => initialState,
  },
});

export const { setRegion, setSearch, clearControls } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;
