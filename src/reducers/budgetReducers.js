import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    removeExpenses: (state, action) => {
      //   const indexOf = state.expenses.indexOf(action.payload);
      state.expenses.splice(action.payload, 1);
    },
    clearExpenses: (state) => {
      state.expenses = [];
    },
  },
});

export const { addExpense, removeExpenses, clearExpenses } =
  budgetSlice.actions;
export default budgetSlice.reducer;
