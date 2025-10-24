import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId, user } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user is admin
        if (user?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Admin can see all livestreams
        const livestreams = await db.livestream.findMany({
            include: {
                course: {
                    select: {
                        title: true,
                    },
                },
            },
            orderBy: {
                scheduledStartTime: "desc",
            },
        });

        return NextResponse.json(livestreams);
    } catch (error) {
        console.log("[ADMIN_LIVESTREAMS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, user } = await auth();
        const body = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user is admin
        if (user?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const { title, description, platform, meetingLink, scheduledStartTime, scheduledEndTime, isPublished, courseId } = body;

        if (!title || !platform || !meetingLink || !scheduledStartTime || !scheduledEndTime || !courseId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Verify course exists
        const course = await db.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        }

        const livestream = await db.livestream.create({
            data: {
                title,
                description,
                platform,
                meetingLink,
                scheduledStartTime: new Date(scheduledStartTime),
                scheduledEndTime: new Date(scheduledEndTime),
                isPublished: isPublished || false,
                courseId,
            },
        });

        return NextResponse.json(livestream);
    } catch (error) {
        console.log("[ADMIN_LIVESTREAMS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

