import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projects";
import studentsReducer from "./students";
import logInReducer from "./logIn";

const store = configureStore({
    reducer: {
        projectsState : projectsReducer,
        studentsState : studentsReducer,
        logInState : logInReducer,
    },
});

export default store;
