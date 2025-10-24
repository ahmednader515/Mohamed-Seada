import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="min-h-screen flex flex-col dashboard-layout">
            <div className="h-[80px] fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-[calc(100vh-80px)] w-56 flex-col fixed top-[80px] right-0 z-40">
                <Sidebar />
            </div>
            <main className="md:pr-56 pt-[80px] flex-1">
                {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;