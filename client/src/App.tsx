import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Food from "./pages/Food";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="h-full">
      <div className="relative h-full antialiased font-RocknRoll">
          <main className="relative flex flex-col min-h-screen">
             <div className="flex-grow flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/food" element={<Food />} />
                  <Route path="/checkout" element={<Checkout />} /> 
                </Routes>
             </div>
          </main>
      </div>
    </div>
  )
}

export default App
