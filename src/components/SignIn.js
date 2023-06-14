import "./SignInStyles.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../redux/slices/users/usersSlices";
import DisabledButton from "./DisabledButton";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";


//form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn() {
  //history
  const history = useHistory();

  //dispatch
  const dispatch = useDispatch();

  //get data from store
  const user = useSelector((state) => state?.users);

  //destructure the user
  const { userAppError, userServerError, userLoading, userAuth } = user;

  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  //redirect user
  useEffect(() => {
    if (userAuth) {
      return history.push("/dashboard");
    }
  }, [userAuth]);

  return (
    
    <div className="signin">
      <Navbar />
      <div className="container">
        <div className="form-box">
          <h1 id="title">Sign In</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              {userAppError || userServerError ? (
                <div>
                  {userServerError}
                  {userAppError}{" "}
                </div>
              ) : null}
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
              <div className="valid2">{formik.touched.email && formik.errors.email}</div>
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
                />
                
              </div>
              <div className="valid2">{formik.touched.password && formik.errors.password}</div>
              </div>
            </div>

            <div className="btn-field">
              {userLoading ? (
                <DisabledButton />
              ) : (
                <button type="submit" id="signinBtn">
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
