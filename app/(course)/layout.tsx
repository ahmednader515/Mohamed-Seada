"use client";

import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";

const CourseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen flex flex-col course-layout">
            <div className="h-[80px] fixed top-0 left-0 right-0 z-50">
                <CourseNavbar />
            </div>
            <div className="hidden md:flex h-[calc(100vh-80px)] w-64 md:w-80 flex-col fixed top-[80px] bottom-0 right-0 z-40 border-l">
                <CourseSidebar />
            </div>
            <main className="pt-[80px] flex-1 md:pr-64 md:lg:pr-80">
                {children}
            </main>
        </div>
    );
}

export default CourseLayout; 