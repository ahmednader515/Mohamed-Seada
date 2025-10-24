"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash2, Video, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";
import axios from "axios";

interface Course {
    id: string;
    title: string;
}

interface Livestream {
    id: string;
    title: string;
    description: string | null;
    platform: string;
    meetingLink: string;
    scheduledStartTime: string;
    scheduledEndTime: string;
    isPublished: boolean;
    courseId: string;
    course: {
        title: string;
    };
}

const LivestreamsPage = () => {
    const router = useRouter();
    const [livestreams, setLivestreams] = useState<Livestream[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedLivestream, setSelectedLivestream] = useState<Livestream | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        platform: "ZOOM",
        meetingLink: "",
        scheduledStartTime: "",
        scheduledEndTime: "",
        isPublished: false,
        courseId: "",
    });

    useEffect(() => {
        fetchLivestreams();
        fetchCourses();
    }, []);

    const fetchLivestreams = async () => {
        try {
            const response = await axios.get("/api/teacher/livestreams");
            setLivestreams(response.data);
        } catch (error) {
            toast.error("فشل في تحميل البثوث المباشرة");
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get("/api/teacher/courses");
            setCourses(response.data);
        } catch (error) {
            toast.error("فشل في تحميل الكورسات");
        }
    };

    const handleOpenDialog = (livestream?: Livestream) => {
        if (livestream) {
            setSelectedLivestream(livestream);
            setFormData({
                title: livestream.title,
                description: livestream.description || "",
                platform: livestream.platform,
                meetingLink: livestream.meetingLink,
                scheduledStartTime: format(new Date(livestream.scheduledStartTime), "yyyy-MM-dd'T'HH:mm"),
                scheduledEndTime: format(new Date(livestream.scheduledEndTime), "yyyy-MM-dd'T'HH:mm"),
                isPublished: livestream.isPublished,
                courseId: livestream.courseId,
            });
        } else {
            setSelectedLivestream(null);
            setFormData({
                title: "",
                description: "",
                platform: "ZOOM",
                meetingLink: "",
                scheduledStartTime: "",
                scheduledEndTime: "",
                isPublished: false,
                courseId: "",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (!formData.title || !formData.meetingLink || !formData.scheduledStartTime || !formData.scheduledEndTime || !formData.courseId) {
                toast.error("الرجاء ملء جميع الحقول المطلوبة");
                return;
            }

            if (selectedLivestream) {
                await axios.patch(`/api/teacher/livestreams/${selectedLivestream.id}`, formData);
                toast.success("تم تحديث البث المباشر بنجاح");
            } else {
                await axios.post("/api/teacher/livestreams", formData);
                toast.success("تم إنشاء البث المباشر بنجاح");
            }

            setIsDialogOpen(false);
            fetchLivestreams();
        } catch (error) {
            toast.error("حدث خطأ أثناء حفظ البث المباشر");
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await axios.delete(`/api/teacher/livestreams/${deleteId}`);
            toast.success("تم حذف البث المباشر بنجاح");
            setIsDeleteDialogOpen(false);
            setDeleteId(null);
            fetchLivestreams();
        } catch (error) {
            toast.error("فشل في حذف البث المباشر");
        }
    };

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        try {
            await axios.patch(`/api/teacher/livestreams/${id}`, { isPublished: !currentStatus });
            toast.success(currentStatus ? "تم إلغاء نشر البث المباشر" : "تم نشر البث المباشر");
            fetchLivestreams();
        } catch (error) {
            toast.error("فشل في تحديث حالة النشر");
        }
    };

    const filteredLivestreams = livestreams.filter(livestream =>
        livestream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        livestream.course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPlatformBadge = (platform: string) => {
        return platform === "ZOOM" ? (
            <Badge className="bg-blue-600 text-white">Zoom</Badge>
        ) : (
            <Badge className="bg-green-600 text-white">Google Meet</Badge>
        );
    };

    const getStatusBadge = (livestream: Livestream) => {
        const now = new Date();
        const start = new Date(livestream.scheduledStartTime);
        const end = new Date(livestream.scheduledEndTime);

        if (now >= start && now <= end && livestream.isPublished) {
            return <Badge className="bg-green-600 text-white">جارٍ الآن</Badge>;
        } else if (now < start && livestream.isPublished) {
            return <Badge className="bg-yellow-600 text-white">قادم</Badge>;
        } else if (now > end) {
            return <Badge className="bg-gray-600 text-white">انتهى</Badge>;
        } else if (!livestream.isPublished) {
            return <Badge variant="outline">غير منشور</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="text-center">جاري التحميل...</div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    إدارة البثوث المباشرة
                </h1>
                <Button 
                    onClick={() => handleOpenDialog()}
                    className="bg-[#8B0620] hover:bg-[#8B0620]/90"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء بث مباشر
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>البثوث المباشرة</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="flex items-center space-x-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="البحث في البثوث المباشرة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">العنوان</TableHead>
                                <TableHead className="text-right">الكورس</TableHead>
                                <TableHead className="text-right">المنصة</TableHead>
                                <TableHead className="text-right">وقت البدء</TableHead>
                                <TableHead className="text-right">وقت الانتهاء</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLivestreams.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                                        لا توجد بثوث مباشرة
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLivestreams.map((livestream) => (
                                    <TableRow key={livestream.id}>
                                        <TableCell className="font-medium">{livestream.title}</TableCell>
                                        <TableCell>{livestream.course.title}</TableCell>
                                        <TableCell>{getPlatformBadge(livestream.platform)}</TableCell>
                                        <TableCell>
                                            {format(new Date(livestream.scheduledStartTime), "dd/MM/yyyy HH:mm", { locale: ar })}
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(livestream.scheduledEndTime), "dd/MM/yyyy HH:mm", { locale: ar })}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(livestream)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleOpenDialog(livestream)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant={livestream.isPublished ? "default" : "outline"}
                                                    onClick={() => handleTogglePublish(livestream.id, livestream.isPublished)}
                                                >
                                                    {livestream.isPublished ? "إلغاء النشر" : "نشر"}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setDeleteId(livestream.id);
                                                        setIsDeleteDialogOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedLivestream ? "تعديل البث المباشر" : "إنشاء بث مباشر جديد"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>العنوان *</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="عنوان البث المباشر"
                            />
                        </div>
                        <div>
                            <Label>الوصف</Label>
                            <Input
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="وصف البث المباشر"
                            />
                        </div>
                        <div>
                            <Label>الكورس *</Label>
                            <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر الكورس" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>المنصة *</Label>
                            <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ZOOM">Zoom</SelectItem>
                                    <SelectItem value="GOOGLE_MEET">Google Meet</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>رابط الاجتماع *</Label>
                            <Input
                                value={formData.meetingLink}
                                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                                placeholder="https://zoom.us/j/... أو https://meet.google.com/..."
                            />
                        </div>
                        <div>
                            <Label>وقت البدء *</Label>
                            <Input
                                type="datetime-local"
                                value={formData.scheduledStartTime}
                                onChange={(e) => setFormData({ ...formData, scheduledStartTime: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>وقت الانتهاء *</Label>
                            <Input
                                type="datetime-local"
                                value={formData.scheduledEndTime}
                                onChange={(e) => setFormData({ ...formData, scheduledEndTime: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isPublished"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            />
                            <Label htmlFor="isPublished">نشر البث المباشر</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                إلغاء
                            </Button>
                            <Button onClick={handleSubmit} className="bg-[#8B0620] hover:bg-[#8B0620]/90">
                                {selectedLivestream ? "تحديث" : "إنشاء"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف البث المباشر نهائياً.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-[#8B0620] hover:bg-[#8B0620]/90"
                        >
                            حذف
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default LivestreamsPage;

