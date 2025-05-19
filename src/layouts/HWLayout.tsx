import Header from "@/components/Header/Header"
import Footer from "@/components/Landing/Footer"
import { Outlet } from "react-router"

function HWLayout() {
  return (
    <>
    <Header isWhiteMode={true}/>
    <Outlet />
    <Footer />
    </>
  )
}

export default HWLayout