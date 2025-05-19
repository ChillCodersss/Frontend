import Header from "@/components/Header/Header"
import Sidebar from "@/components/Sidebar/Sidebar"
import { Outlet } from "react-router"

function HSLayout() {
  return (
    <>
    <Header />
    <Sidebar>
        <Outlet />
    </Sidebar>
    </>
  )
}

export default HSLayout