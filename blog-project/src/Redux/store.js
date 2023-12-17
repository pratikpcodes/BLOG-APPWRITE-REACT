import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auhslice"
const store= configureStore({
reducer:{
    auth : authSlice,

}

});

export default store;
