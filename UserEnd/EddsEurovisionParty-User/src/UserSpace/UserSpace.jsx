import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Vote } from "./Vote/Vote";
import { Food } from "./Food/Food";
import { Dashboard } from "./Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UserSpace = ({ user, setUser }) => {
  const navigator = useNavigate();
  useEffect(() => {
    if (user.id == undefined) {
      // TODO: Re enable before live
      // navigator("/login");
    }
  }, [user, navigator, setUser]);

  return (
    <Routes>
      <Route path="*" element={<Home user={user} />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/food" element={<Food />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
