import Header from "@/components/Header/Header";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <Header />
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
