import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Meal from "./pages/Meal";
import Verify from "./pages/Verify";
import PersisttentLogin from "./components/PersisttentLogin";

function App() {
  return (
    <div className="h-full">
      <div className="relative h-full antialiased font-RocknRoll">
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Routes>
              <Route path="/verify/:code" element={<Verify />} />
              <Route element={<Layout />}>
                <Route element={<PersisttentLogin />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/menu/:mealId" element={<Meal />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
