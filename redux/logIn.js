import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};

const logInStateSlice = createSlice({
    name: "logInStateSlice",
    initialState: initialState,
    reducers: {
        setLogIn: (state, action) => {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            };
        },
    },
});

export const { setLogIn } = logInStateSlice.actions;

export default logInStateSlice.reducer;
