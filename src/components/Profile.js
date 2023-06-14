import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userProfileAction } from "../redux/slices/users/usersSlices";
import DateFormatter from "../utils/dateFormatter";
import ErrorDisplayMessage from "./ErrorDisplayMessage";
import Loading from "./Loading";
import NavbarAfterLogin from "./NavbarAfterLogin";
import "./Profile.css";
import image from "./profile-pic.jpg";
        

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);
  const state = useSelector((state) => state?.users);
  const { loading, appError, serverError, userAuth, profile } = state;

  const history = useHistory();

  return (
    <>
      {loading ? (
        <Loading />
      ) : appError || serverError ? (
        <ErrorDisplayMessage>
          {appError} {serverError}
        </ErrorDisplayMessage>
      ) : (
        <div>
          <NavbarAfterLogin />
          <div className="container">
            <img></img>
            <div className="profile-box">
            <img className="profile-pic" src={image} alt="My Image" /><br/>
            
              <span>
                {profile?.firstname} {profile?.lastname} 
              </span><br/>
              <br/><span>
                {profile?.expenses?.length + profile?.incomes?.length} Records
                Created
              </span><br/>
              <br/> <p>{profile?.email}</p><br/>
              {profile?.createdAt && (
                <p>Date Joined : {DateFormatter(profile?.createdAt)}</p>
              )}<br/>
              <button className="edit-btn"
                type="button"
                onClick={() => {
                  history.push({ pathname: "/update-user", state: profile });
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
