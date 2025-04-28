import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Login/Login";
import { UserSpace } from "./UserSpace/UserSpace";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [user, setUser] = useState({ id: undefined, session: undefined });
  // bg-gradient-to-r from-pink-to-blue-start to-pink-to-blue-end bg-[200%_100%] animate-gradient-move
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-700 bg-[200%_100%] animated-background h-[200vh] w-[180vw] z-[-1] rotate-25 -top-30 -left-98 scale-150"></div>
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
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
