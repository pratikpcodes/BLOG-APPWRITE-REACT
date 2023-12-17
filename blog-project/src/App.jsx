import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import Login from "./Redux/auhslice"
import { logOut } from "./Redux/auhslice";
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log("working");

  useEffect(()=>{
    authService.getCurrUser()
    .then((data)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logOut())
      }
    })
    .finally(()=>setLoading(false))

  },[])
  
  return !loading? (
  <div >
<div >
<Header/>
<Footer/>
</div>
working 2

  </div>):null
}

export default App;
