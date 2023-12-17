import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../Redux/auhslice";

function Logoutbtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logOut());
      //update logout info in store
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">

        LOGOUT
    </button>
  );
}

export default Logoutbtn;
