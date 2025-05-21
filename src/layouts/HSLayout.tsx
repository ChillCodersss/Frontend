import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function HSLayout() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          width: "220px",
          padding: "5px 10px",
          gap: "2px",
          fontSize: "0.9rem",
          textAlign: "right",
        }}
      />
      <Header />
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
}

export default HSLayout;
