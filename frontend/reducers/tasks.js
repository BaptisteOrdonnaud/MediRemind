import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
};

export const tasksSlice = createSlice({
    name: 'tasks',

    initialState,
    reducers: {
        addTask: (state, action) => {
            state.value.push(action.payload)
        },
        setdelete: (state, action) => {
            state.value = state.value.filter((task) => task.task !== action.payload)
        },

    },
});

export const { addTask, setdelete } = tasksSlice.actions;
export default tasksSlice.reducer;