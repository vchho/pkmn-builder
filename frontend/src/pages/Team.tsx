import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const Team = () => {
  return (
    <div className="h-full">
      {/* <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50"> */}
      <div className="h-[80px] fixed inset-y-0 w-full z-[49]">
        <Navbar />
      </div>
      {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50"> */}
      <div className="hidden lg:flex pt-[80px] h-full w-72 flex-col fixed inset-y-0 z-[48]">
        <Sidebar />
      </div>
      {/* <main className="md:pl-56 pt-[80px] h-full"> */}
      <main className="lg:pl-72 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Team;