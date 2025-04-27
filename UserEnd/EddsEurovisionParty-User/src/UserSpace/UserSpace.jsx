import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Vote } from "./Vote/Vote";
import { Food } from "./Food/Food";
import { Dashboard } from "./Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Notifications } from "./Notifications/Notifications";
import axios from "axios";
import { APIUrl } from "@/APIUrl";

export const UserSpace = ({ user, setUser }) => {
  const navigator = useNavigate();
  useEffect(() => {
    if (user.id == undefined) {
      navigator("/login");
    }
  }, [user, navigator, setUser]);

  const invalidateUser = async () => {
    await axios.get(`${APIUrl}/session/clear`, { withCredentials: true });
    setUser({ id: undefined, name: undefined, email: undefined });
    navigator("/login");
  };
  return (
    <>
      <Notifications />
      <Routes>
        <Route
          path="*"
          element={
            <Home
              user={user}
              invalidateUser={() => {
                invalidateUser();
              }}
            />
          }
        />
        <Route
          path="/vote"
          element={
            <Vote
              invalidateUser={() => {
                invalidateUser();
              }}
            />
          }
        />
        <Route path="/food" element={<Food />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              invalidateUser={() => {
                invalidateUser();
              }}
            />
          }
        />
      </Routes>
    </>
  );
};
