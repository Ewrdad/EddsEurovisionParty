import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Login/Login";
import { UserSpace } from "./UserSpace/UserSpace";
import { Toaster } from "./components/ui/sonner";
import usePWAInstallPrompt from "./Install";
import { Food } from "./UserSpace/Food/Food";
// import { PastWinners } from "./UserSpace/Home/PastWinners"; // Commented out or removed old import
import { Dashboard } from "./UserSpace/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState({ id: undefined, session: undefined });
  const { canInstall, promptToInstall } = usePWAInstallPrompt();
  useEffect(() => {
    if (canInstall && user.session) {
      console.log("Prompting to install");
      promptToInstall();
    }
    console.log("Prompting to install");
  }, [canInstall, promptToInstall, user.id, user.session]);
  // bg-gradient-to-r from-pink-to-blue-start to-pink-to-blue-end bg-[200%_100%] animate-gradient-move
  return (
    <>
      {/* Updated animated background to match PastWinners theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 bg-[200%_100%] animated-background h-[200vh] w-[180vw] z-[-1] rotate-25 -top-30 -left-98 scale-150"></div>

      {/* Ensure this container is transparent or doesn't have a conflicting background if the animated one is primary */}
      <div className="w-screen h-dvh bg-transparent min-h-screen">
        <Router>
          <Routes>
            <Route path="*" element={<Login user={user} setUser={setUser} />} />

            <Route
              path="/user/*"
              element={<UserSpace user={user} setUser={setUser} />}
            >
              <Route path="food" element={<Food />} />
              {/* <Route path="past-winners" element={<PastWinners />} /> */}
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
