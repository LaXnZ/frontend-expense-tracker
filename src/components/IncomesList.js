import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../redux/slices/users/usersSlices";
import { Link } from "react-router-dom";
import NavbarAfterLogin from "./NavbarAfterLogin";
import ContentDetails from "./ContentDetails";
import AppPagination from "./AppPagination";
import Loading from "./Loading";
import ErrorDisplayMessage from "./ErrorDisplayMessage";
import "./Lists.css";



export default function IncomesList() {
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
        <h2>No income found</h2>
      ) : (
        <div>
          <h6 class="heading">Recent Income Transactions</h6>
          <p class="listfont">Below is the history of your income transactions records</p>
          <div className="newExpensebtn">
            {/* <Link to="/add-income" className="btn btn-primary">
            New Income
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
                  <h1>No Income Found</h1>
                ) : (
                  profile?.incomes
                    ?.map((income) => {
                      return <ContentDetails key={income?._id} {...income} />;
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
