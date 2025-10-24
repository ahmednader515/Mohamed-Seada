import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = ({ closeOnClick = false }: { closeOnClick?: boolean }) => {
    return (
        <div className="h-full border-l flex flex-col overflow-y-auto bg-card shadow-sm">
            <div className="flex flex-col w-full border-l-2 pt-0">
                <SidebarRoutes closeOnClick={closeOnClick} />
            </div>
        </div>
    )
}