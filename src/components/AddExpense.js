import React, { useDebugValue } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddExpenseStyles.css";
import NavbarAfterLogin from "./NavbarAfterLogin";
// import footer from "./Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { createExpenseAction } from "../redux/slices/expenses/expensesSlices";
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

export default function AddExpense() {
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
      dispatch(createExpenseAction(values));
    },
    validationSchema: formSchema,
  });

  //get expenseCreated from store
  const state = useSelector((state) => state?.expenses);
  const { loading, appError, serverError, expenseCreated, isExpenseCreated } =
    state;

  //redirecting to expense list page
  useEffect(() => {
    if (isExpenseCreated) history.push("/expense-list");
  }, [isExpenseCreated, dispatch]);

  return (
    <div>
      <NavbarAfterLogin />
      <div className="box">
        <form onSubmit={formik.handleSubmit} className="expensebox">
          <br />
          <h4>Expense</h4>
          <br />
          <b>
            <h4>Record New Expense</h4>
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
              Record Expense
            </button>
          )}
        </form>
      </div>
    </div>
   
  );
  // <Footer />
}
