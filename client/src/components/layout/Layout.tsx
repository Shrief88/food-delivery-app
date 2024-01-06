import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Contact from "./Contact"

import Navbar from "../navbar/Navbar"
const Layout = () => {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <Outlet />
      <Toaster />
      <Contact />
    </div>
  )
}

export default Layout;