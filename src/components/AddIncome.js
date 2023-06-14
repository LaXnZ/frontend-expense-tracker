import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddExpenseStyles.css";
import NavbarAfterLogin from "./NavbarAfterLogin";
import { useDispatch, useSelector } from "react-redux";
import { createIncomeAction } from "../redux/slices/incomes/incomesSlices";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import DisabledButton from "./DisabledButton";
import ErrorDisplayMessage from "./ErrorDisplayMessage";

//form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

export default function AddIncome() {
  //accessing state to get location details
  const location = useLocation();

  const history = useHistory();

  //dispatch
  const dispatch = useDispatch();

  //formik form
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: (values) => {
      dispatch(createIncomeAction(values));
    },
    validationSchema: formSchema,
  });

  //get expenseCreated from store
  const state = useSelector((state) => state.incomes);
  const { loading, appError, serverError, incomeCreated, isIncomeCreated } =
    state;

  //redirecting to dashboard
  useEffect(() => {
    if (isIncomeCreated) history.push("/income-list");
  }, [isIncomeCreated, dispatch]);

  return (
    <div>
      <NavbarAfterLogin />
      <div className="box">
        <form onSubmit={formik.handleSubmit} className="expensebox">
          <br />
          <h4>Income</h4>
          <br />
          <b>
            <h4>Record New Income</h4>
          </b>
          {serverError || appError ? (
            <ErrorDisplayMessage>
              {serverError} {appError}
            </ErrorDisplayMessage>
          ) : null}{" "}
          <br />
          <input
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            class="title"
            placeholder="Enter Title"
          />
          <div className="error-msg">{formik.touched.title && formik.errors.title}</div>
          <br />
          <input
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            class="title"
            placeholder="Enter Description"
          />
          <div className="error-msg">{formik.touched.description && formik.errors.description}</div>
          <br />
          <input
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange("amount")}
            onBlur={formik.handleBlur("amount")}
            class="title"
            placeholder="Enter Amount"
          />
          <div className="error-msg">{formik.touched.amount && formik.errors.amount}</div>
          <br />
          {loading ? (
            <DisabledButton />
          ) : (
            <button type="submit" class="btn">
              Record Income
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
