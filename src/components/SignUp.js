import React, { useEffect } from "react";
import "./SignUpStyles.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registerUserAction } from "../redux/slices/users/usersSlices";
import DisabledButton from "./DisabledButton";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

//form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
});

export default function SignUp() {
  //history
  const history = useHistory();

  //get data from store
  const user = useSelector((state) => state?.users);

  //destructure the user
  const { userAppError, userServerError, userLoading, isRegistered } = user;

  //dispatch
  const dispatch = useDispatch();

  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  //redirect user
  useEffect(() => {
    if (isRegistered) {
      return history.push("/sign-in");
    }
  }, [isRegistered]);

  return (
    <div className="signin">
      <Navbar />
      <div className="container">
        <div className="form-box">
          <h1 id="title">Sign Up</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              {userAppError || userServerError ? (
                <div>
                  {userServerError}
                  {userAppError}{" "}
                </div>
              ) : null}
              <div className="input-field" id="nameField">
                <i className="fa-solid fa-user"></i>
                <div>
                <input
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="Valid1">{formik.touched.firstname && formik.errors.firstname}</div>
              </div>

              <div className="input-field">
                <i className="fa-solid fa-user"></i>
                <div>
                <input
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="Valid1">{formik.touched.lastname && formik.errors.lastname}</div>
              </div>

              <div className="input-field">
                <i className="fa-solid fa-envelope"></i>
                <div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="Valid1">{formik.touched.email && formik.errors.email}</div>
              </div>

              <div className="input-field">
                <i className="fa-solid fa-lock"></i>
                <div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  type="password"
                  placeholder="Password"
                  minLength={8}
                />
              </div>
              <div className="Valid1">{formik.touched.password && formik.errors.password}</div>
              </div>
            </div>

            <div className="btn-field">
              {userLoading ? (
                <DisabledButton />
              ) : (
                <button type="submit" id="signinBtn">
                  Sign Up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
