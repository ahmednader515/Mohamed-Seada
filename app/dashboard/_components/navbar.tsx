import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"
import { Logo } from "./logo"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-card shadow-sm">
            <MobileSidebar />
            <div className="hidden md:flex items-center ml-4">
                <Logo />
            </div>
            <div className="flex items-center gap-x-4 mr-auto">
                <NavbarRoutes />
            </div>
        </div>
    )
}