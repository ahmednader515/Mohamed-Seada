import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { userId } = await auth();
        const resolvedParams = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get published livestreams for the course
        const livestreams = await db.livestream.findMany({
            where: {
                courseId: resolvedParams.courseId,
                isPublished: true,
            },
            select: {
                id: true,
                title: true,
                description: true,
                platform: true,
                meetingLink: true,
                scheduledStartTime: true,
                scheduledEndTime: true,
            },
            orderBy: {
                scheduledStartTime: "asc",
            },
        });

        // Filter to only show upcoming or active livestreams (not ended)
        const now = new Date();
        const activeLivestreams = livestreams.filter(
            (livestream) => new Date(livestream.scheduledEndTime) > now
        );

        return NextResponse.json(activeLivestreams);
    } catch (error) {
        console.log("[COURSE_LIVESTREAMS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

