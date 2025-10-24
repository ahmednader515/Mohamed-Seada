"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    closeOnClick?: boolean;
}

export const SidebarItem = ({
    icon: Icon,
    label,
    href,
    closeOnClick = false
}: SidebarItemProps) => {

    const pathName = usePathname();
    const router = useRouter();
    

    const isActive = pathName === href;

    const onClick = () => {
        if (!isActive) router.push(href);
    }

    const ButtonEl = (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-muted-foreground text-sm font-[500] pl-6 transition-all hover:text-[#8B0620] hover:bg-[#8B0620]/10 relative",
                isActive && "text-[#8B0620] bg-[#8B0620]/10 hover:bg-[#8B0620]/10"
            )}
        >
            <div className="flex items-center gap-x-2 py-3">
                <Icon 
                    size={22} 
                    className={cn(
                        "text-muted-foreground",
                        isActive && "text-[#8B0620]"
                    )} 
                />
                {label}
            </div>

            <div 
                className={cn(
                    "absolute left-0 top-0 bottom-0 opacity-0 border-l-2 border-[#8B0620] transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    );

    return closeOnClick ? (
        <SheetClose asChild>
            {ButtonEl}
        </SheetClose>
    ) : (
        ButtonEl
    );
}