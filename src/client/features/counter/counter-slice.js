// Duck pattern
import { createSlice } from '@reduxjs/toolkit';

// interface CounterState {
//   value: number;
// }

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // increment
    // decrement
    // reset
    incrementCounter(state) {
      // it is ok to do this because immer makes it immutable under the hood
      state.value++;
    },
    decrementCounter(state) {
      state.value--;
    },
    resetCounter(state) {
      state.value = 0;
    }
  },
});

export const { incrementCounter, decrementCounter, resetCounter } = counterSlice.actions;
export default counterSlice.reducer;