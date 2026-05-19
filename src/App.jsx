import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <>
      <div>
        <Header user={user} setUser={setUser} />
        <Outlet context={{ user }} />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;
