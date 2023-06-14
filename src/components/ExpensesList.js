import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavbarAfterLogin from "./NavbarAfterLogin";
import ContentDetails from "./ContentDetails";
import AppPagination from "./AppPagination";
import Loading from "./Loading";
import ErrorDisplayMessage from "./ErrorDisplayMessage";
import { userProfileAction } from "../redux/slices/users/usersSlices";
import "./Lists.css";

export default function ExpensesList() {
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  // state
  const state = useSelector((state) => state?.users);
  const { loading, appError, serverError, profile } = state;

  return (
    <div>
      <NavbarAfterLogin />
      <div className="page1">
        {loading ? (
          <Loading />
        ) : appError || serverError ? (
          <ErrorDisplayMessage>
            {serverError} {appError}
          </ErrorDisplayMessage>
        ) : profile?.expenses?.length <= 0 ? (
          <h2>No expense found</h2>
        ) : (
          <div>
            <h6 class="heading">Recent Expense Transactions</h6>
            <p class="listfont">Below is the history of your expense transactions records</p>
           <div className="newExpensebtn">
             {/* <Link to="/add-expense" className="btn btn-primary">
              New Expense
            </Link> */}
            </div>
            <div className="box">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <h1>loading</h1>
                  ) : appError || serverError ? (
                    <div>Error</div>
                  ) : profile?.expenses?.length <= 0 ? (
                    <h1>No Expenses Found</h1>
                  ) : (
                    profile?.expenses
                      ?.map((expense) => {
                        return (
                          <ContentDetails key={expense?._id} {...expense} />
                        );
                      })
                      ?.reverse()
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
