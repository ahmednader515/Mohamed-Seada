"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CheckCircle, Circle, Video, ExternalLink } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Chapter {
  id: string;
  title: string;
  isFree: boolean;
  userProgress: {
    isCompleted: boolean;
  }[];
}

interface Quiz {
  id: string;
  title: string;
  position: number;
  quizResults: {
    id: string;
    score: number;
    totalPoints: number;
    percentage: number;
  }[];
}

interface CourseContent {
  id: string;
  title: string;
  position: number;
  type: 'chapter' | 'quiz';
  isFree?: boolean;
  userProgress?: {
    isCompleted: boolean;
  }[];
  quizResults?: {
    id: string;
    score: number;
    totalPoints: number;
    percentage: number;
  }[];
}

interface Livestream {
  id: string;
  title: string;
  description: string | null;
  platform: string;
  meetingLink: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
}

interface CourseSidebarProps {
  course?: {
    id: string;
    title: string;
    chapters: Chapter[];
  };
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [courseContent, setCourseContent] = useState<CourseContent[]>([]);
  const [livestreams, setLivestreams] = useState<Livestream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState<string>("");

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const courseId = course?.id || params.courseId;
      if (!courseId) {
        throw new Error("Course ID is required");
      }
      const [contentResponse, courseResponse, livestreamsResponse] = await Promise.all([
        axios.get(`/api/courses/${courseId}/content?t=${Date.now()}`),
        axios.get(`/api/courses/${courseId}?t=${Date.now()}`),
        axios.get(`/api/courses/${courseId}/livestreams?t=${Date.now()}`)
      ]);
      setCourseContent(contentResponse.data);
      setCourseTitle(courseResponse.data.title);
      setLivestreams(livestreamsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load course data");
    } finally {
      setLoading(false);
    }
  }, [course?.id, params.courseId]);

  // Refresh data when pathname changes (indicating navigation)
  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData, pathname]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  useEffect(() => {
    // Update selected content based on current path
    const currentContentId = pathname?.split("/").pop();
    setSelectedContentId(currentContentId || null);
  }, [pathname]);

  const onClick = (content: CourseContent) => {
    const courseId = course?.id || params.courseId;
    if (courseId) {
      setSelectedContentId(content.id);
      if (content.type === 'chapter') {
        router.push(`/courses/${courseId}/chapters/${content.id}`);
      } else if (content.type === 'quiz') {
        router.push(`/courses/${courseId}/quizzes/${content.id}`);
      }
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-lg">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">جاري تحميل الكورس</h1>
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full border-l flex flex-col overflow-y-auto shadow-lg w-64 md:w-80">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">حدث خطأ</h1>
        </div>
        <div className="flex items-center justify-center h-full text-red-500">
          {error}
        </div>
      </div>
    );
  }

  const getLivestreamStatus = (livestream: Livestream) => {
    const now = new Date();
    const start = new Date(livestream.scheduledStartTime);
    const end = new Date(livestream.scheduledEndTime);

    if (now >= start && now <= end) {
      return { status: 'live', label: 'جارٍ الآن', color: 'bg-[#8B0620]' };
    } else if (now < start) {
      return { status: 'upcoming', label: 'قادم', color: 'bg-yellow-600' };
    }
    return { status: 'ended', label: 'انتهى', color: 'bg-gray-600' };
  };

  return (
    <div className="h-full border-l flex flex-col overflow-y-auto shadow-lg w-72 md:w-80">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{courseTitle || course?.title}</h1>
      </div>
      
      {/* Livestreams Section */}
      {livestreams.length > 0 && (
        <div className="border-b bg-blue-50 dark:bg-blue-950">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Video className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-blue-900 dark:text-blue-100">البثوث المباشرة</h2>
            </div>
            <div className="space-y-2">
              {livestreams.map((livestream) => {
                const { status, label, color } = getLivestreamStatus(livestream);
                return (
                  <div key={livestream.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{livestream.title}</h3>
                      <Badge className={`${color} text-white text-xs`}>{label}</Badge>
                    </div>
                    {livestream.description && (
                      <p className="text-xs text-muted-foreground mb-2">{livestream.description}</p>
                    )}
                    <div className="text-xs text-muted-foreground mb-2">
                      <div>البدء: {new Date(livestream.scheduledStartTime).toLocaleString('ar-EG')}</div>
                      <div>الانتهاء: {new Date(livestream.scheduledEndTime).toLocaleString('ar-EG')}</div>
                    </div>
                    {status !== 'ended' && (
                      <Button
                        size="sm"
                        className="w-full bg-[#8B0620] hover:bg-[#8B0620]/90 text-white"
                        onClick={() => window.open(livestream.meetingLink, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        انضم الآن - {livestream.platform === 'ZOOM' ? 'Zoom' : 'Google Meet'}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col w-full">
        {courseContent.map((content) => {
          const isSelected = selectedContentId === content.id;
          const isCompleted = content.type === 'chapter' 
            ? content.userProgress?.[0]?.isCompleted || false
            : content.quizResults && content.quizResults.length > 0;
          
          return (
            <div
              key={content.id}
              className={cn(
                "flex items-center gap-x-2 text-sm font-[500] rtl:pr-4 ltr:pl-4 py-4 transition cursor-pointer",
                isSelected 
                  ? "bg-slate-200 text-slate-900"
                  : "text-slate-500 hover:bg-slate-300/20 hover:text-slate-600",
                isCompleted && !isSelected && "text-emerald-600"
              )}
              onClick={() => onClick(content)}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              <span className="rtl:text-right ltr:text-left flex-grow mr-1">
                {content.title}
                {content.type === 'quiz' && (
                  <span className="ml-2 text-xs text-[#8B0620]">(اختبار)</span>
                )}
              </span>
              {content.type === 'chapter' && content.isFree && (
                <span className="ml-4 px-2 py-0.5 text-xs font-semibold bg-red-100 text-[#8B0620] rounded-full">
                  مجاني
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 