import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="h-full">
      {/* <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50"> */}
      <div className="fixed inset-y-0 z-[49] h-[80px] w-full">
        <Navbar />
      </div>
      {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50"> */}
      <div className="fixed inset-y-0 z-[48] hidden h-full w-72 flex-col pt-[80px] lg:flex">
        <Sidebar />
      </div>
      {/* <main className="md:pl-56 pt-[80px] h-full"> */}
      <main className="h-full pt-[80px] lg:pl-72">
        <Outlet />
      </main>
    </div>
  );
};

export default MainContainer;
