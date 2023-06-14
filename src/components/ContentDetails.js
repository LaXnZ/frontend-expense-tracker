import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import currencyFormatter from "../utils/currencyFormatter";
import dateFormatter from "../utils/dateFormatter";
import { deleteExpenseAction } from "../redux/slices/expenses/expensesSlices";
import { deleteIncomeAction } from "../redux/slices/incomes/incomesSlices";
import "./ContentDetails.css";

export default function ContentDetails(item) {
  //to refresh the page after deleting the content
  const refresh = () => window.location.reload(true);

  //to navigate to edit page
  const history = useHistory();

  //to delete content
  const dispatch = useDispatch();
  const deleteContent = (id) => {
    if (item?.type === "Income") {
      dispatch(deleteIncomeAction({ id }));
    } else if (item?.type === "Expense") {
      dispatch(deleteExpenseAction({ id }));
    }
  };

  return (
    <>
      <tr>
        <td>{item?.title}</td>
        <td>{item?.description}</td>
        <td>{currencyFormatter("usd", item?.amount)}</td>
        <td>{item?.createdAt && dateFormatter(item?.createdAt)}</td>
        <td>
          <button
            onClick={() =>
              history.push({
                pathname: `/edit`,
                state: { item },
              })
            }
            className="update-btn"
          >
            Update
          </button>
          <button
            onClick={() => {
              deleteContent(item?._id);
              refresh();
            }}
            className="delete-btn"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
