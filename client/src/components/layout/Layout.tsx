import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Contact from "./Contact"

import Navbar from "../navbar/Navbar"
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Outlet />
      <Toaster />
      <Contact />
    </div>
  )
}

export default Layout;