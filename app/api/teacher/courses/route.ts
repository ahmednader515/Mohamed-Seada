import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get all courses belonging to the teacher
        const courses = await db.course.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                title: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.log("[TEACHER_COURSES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

