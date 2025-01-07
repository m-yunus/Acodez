import Header from "@/Blocks/Header"
import Sidebar from "@/Blocks/Sidebar"
import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header Section */}
      <header className="bg-[#1976d2] h-[7%] flex items-center justify-between px-4">
        <Header />
      </header>

      {/* Main Content Section */}
      <div className="flex h-full w-full">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet /> {/* This renders the nested route content */}
        </main>
      </div>
    </div>
  )
}

export default Layout