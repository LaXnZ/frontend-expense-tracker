import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import NavbarAfterLogin from "./NavbarAfterLogin";
import "./UpdateUserStyles.css";
import { useFormik } from "formik";
import { updateUserProfileAction } from "../redux/slices/users/usersSlices";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import DisabledButton from "./DisabledButton";
import ErrorDisplayMessage from "./ErrorDisplayMessage";
//form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
});

export default function UpdateUser() {
  //history
  const history = useHistory();

  const location = useLocation();
  const user = location.state;

  //get data from store
  const state = useSelector((state) => state?.users);

  //destructure the user
  const { userAppError, userServerError, userLoading, userAuth } = state;

  //dispatch
  const dispatch = useDispatch();

  //formik form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
    },
    onSubmit: (values) => {
      dispatch(updateUserProfileAction(values));

      //Redirect to the profile
      history.push("/profile");
    },
    validationSchema: formSchema,
  });

  return (
    <>
      {userAppError || userServerError ? (
        <ErrorDisplayMessage>
          {userAppError} {userServerError}
        </ErrorDisplayMessage>
      ) : (
        <div>
          <NavbarAfterLogin />
          <form onSubmit={formik.handleSubmit} className="UpdateUser">
            <b>
              <h4>Update User Profile</h4>
            </b>
            <br />
            <h5>Hi user, Do you want to update your profile ?</h5>
            <br />
            <br />
            <div className="input-field" id="nameField">
              <i className="fa-solid fa-user"></i>
              <input
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="error-msg">{formik.touched.firstname && formik.errors.firstname}</div>

            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <input
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="error-msg">{formik.touched.lastname && formik.errors.lastname}</div>
            

            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="error-msg">{formik.touched.email && formik.errors.email}</div><br/>
            
            {userLoading ? (
              <DisabledButton />
            ) : (
              <button className="update-btn" type="submit"> Update </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
