import React from "react";
import { logoutUserAction } from "../redux/slices/users/usersSlices";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUserAction());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      Logout..
    </div>
  );
}
