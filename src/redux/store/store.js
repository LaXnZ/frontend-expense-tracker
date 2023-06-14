import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../slices/expenses/expensesSlices";
import usersReducer from "../slices/users/usersSlices";
import incomesReducer from "../slices/incomes/incomesSlices";
import account from "../slices/accountStatistics/accountStatSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses: expensesReducer,
    incomes: incomesReducer,
    account,
  },
});

export default store;
