import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ livestreamId: string }> }
) {
    try {
        const { userId, user } = await auth();
        const resolvedParams = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user is admin
        if (user?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const livestream = await db.livestream.findUnique({
            where: {
                id: resolvedParams.livestreamId,
            },
            include: {
                course: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        if (!livestream) {
            return new NextResponse("Livestream not found", { status: 404 });
        }

        return NextResponse.json(livestream);
    } catch (error) {
        console.log("[ADMIN_LIVESTREAM_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ livestreamId: string }> }
) {
    try {
        const { userId, user } = await auth();
        const resolvedParams = await params;
        const body = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user is admin
        if (user?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const { title, description, platform, meetingLink, scheduledStartTime, scheduledEndTime, isPublished, courseId } = body;

        const updateData: any = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (platform !== undefined) updateData.platform = platform;
        if (meetingLink !== undefined) updateData.meetingLink = meetingLink;
        if (scheduledStartTime !== undefined) updateData.scheduledStartTime = new Date(scheduledStartTime);
        if (scheduledEndTime !== undefined) updateData.scheduledEndTime = new Date(scheduledEndTime);
        if (isPublished !== undefined) updateData.isPublished = isPublished;
        if (courseId !== undefined) updateData.courseId = courseId;

        const livestream = await db.livestream.update({
            where: {
                id: resolvedParams.livestreamId,
            },
            data: updateData,
        });

        return NextResponse.json(livestream);
    } catch (error) {
        console.log("[ADMIN_LIVESTREAM_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ livestreamId: string }> }
) {
    try {
        const { userId, user } = await auth();
        const resolvedParams = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user is admin
        if (user?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await db.livestream.delete({
            where: {
                id: resolvedParams.livestreamId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.log("[ADMIN_LIVESTREAM_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

