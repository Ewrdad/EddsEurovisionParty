import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Login/Login";
import { UserSpace } from "./UserSpace/UserSpace";

function App() {
  const [user, setUser] = useState({ id: undefined, session: undefined });

  return (
    <div className="bg-gray-600 w-screen h-screen">
      <Router>
        <Routes>
          <Route path="*" element={<Login user={user} setUser={setUser} />} />

          <Route path="/user/*" element={<UserSpace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
