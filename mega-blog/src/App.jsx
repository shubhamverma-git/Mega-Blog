import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
import Input from "./components/Input/Input";

function App() {
  const [loading, setLoading] = useState(true); // we are using loading if the server takes time to give data
  const dispatch = useDispatch();
  // step 1: using useEffect to see that the user is logged in or not whenever the app loads
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      // .catch((error) => {
      //   console.log(error);
      // })
      .finally(() => setLoading(false)); // finally will help to run the method whether there is catch or not
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* <Outlet /> */}</main>
        <Footer />
        <Input />
      </div>
    </div>
  ) : null;
}

export default App;
