import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/ui/Layout";
import Meal from "./pages/Meal";
import Verify from "./pages/Verify";

function App() {
  return (
    <div className="h-full">
      <div className="relative h-full antialiased font-RocknRoll">
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Routes>
              <Route path="/verify/:code" element={<Verify />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:mealId" element={<Meal />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
