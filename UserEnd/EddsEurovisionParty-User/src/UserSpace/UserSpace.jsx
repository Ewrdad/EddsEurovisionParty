import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Vote } from "./Vote/Vote";
import { Food } from "./Food/Food";
import { Dashboard } from "./Dashboard/Dashboard";

export const UserSpace = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/food" element={<Food />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
