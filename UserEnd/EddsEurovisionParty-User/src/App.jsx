import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Login/Login";
import { UserSpace } from "./UserSpace/UserSpace";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [user, setUser] = useState({ id: undefined, session: undefined });

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 z-[-1]"></div>
      <div className=" w-screen h-dvh bg-fixed min-h-screen ">
        <Router>
          <Routes>
            <Route path="*" element={<Login user={user} setUser={setUser} />} />

            <Route
              path="/user/*"
              element={<UserSpace user={user} setUser={setUser} />}
            />
          </Routes>
        </Router>
      </div>
      <Toaster richColors />
    </>
  );
}

export default App;
