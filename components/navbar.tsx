"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogOut, ChevronDown, Brain, GraduationCap, BookOpen, MessageCircle, User, Award, FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="w-full bg-[#8B0620] shadow-lg relative overflow-visible">
      {/* Logo - positioned at the top of navbar */}
      <Link href="/" className="flex items-center group absolute top-0 right-4 md:right-8 z-[100]">
        <div className="relative" data-logo-container>
          <div className="bg-white pt-1 md:pt-2 px-2 md:px-4 pb-2 md:pb-3 rounded-b-lg shadow-xl group-hover:shadow-2xl transition-all duration-300 transform border border-gray-200 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="md:w-[150px] md:h-[150px] w-[90px] h-[90px]"
              unoptimized
            />
          </div>
        </div>
      </Link>
      
      <div className="container mx-auto px-4 max-w-full overflow-visible">
        <div className="flex items-center justify-between h-20 max-w-full overflow-visible">

          {/* Spacer for logo on the right */}
          <div className="w-24 md:w-40 flex-shrink-0"></div>

          {/* Mobile controls - Auth buttons and menu button */}
          <div className="flex lg:hidden items-center gap-2 absolute left-4">
            {!session && (
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white text-[#0BA6DF] bg-white hover:bg-gray-100 text-xs px-3 py-1 h-8"
                  asChild
                >
                  <Link href="/sign-up">انشاء حساب</Link>
                </Button>
                <Button 
                  size="sm"
                  className="bg-[#0BA6DF] text-white hover:bg-[#0BA6DF]/90 text-xs px-3 py-1 h-8" 
                  asChild
                >
                  <Link href="/sign-in">دخول</Link>
                </Button>
              </div>
            )}
            
            <button
              className="text-white p-2 z-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse flex-1 justify-center">
            <Link href="/" className="text-white hover:text-gray-200 transition-colors font-bold whitespace-nowrap">
              الرئيسية
            </Link>
            <div className="relative group">
              <Link href="/courses" className="text-white hover:text-gray-200 transition-colors flex items-center font-bold whitespace-nowrap">
                الأقسام التدريبية
                <ChevronDown className="h-4 w-4 mr-1 rtl:ml-1" />
              </Link>
            </div>
            <Link href="/courses" className="text-white hover:text-gray-200 transition-colors font-bold whitespace-nowrap">
              الكورسات
            </Link>
            <Link href="/consultations" className="text-white hover:text-gray-200 transition-colors font-bold whitespace-nowrap mr-8 rtl:ml-8">
              الاستشارات
            </Link>
          </nav>

          {/* Right side items */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {!session ? (
              <>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white text-[#0BA6DF] bg-white hover:bg-gray-100"
                  asChild
                >
                  <Link href="/sign-up">انشاء حساب</Link>
                </Button>
                <Button className="bg-[#0BA6DF] text-white hover:bg-[#0BA6DF]/90" asChild>
                  <Link href="/sign-in">تسجيل دخول</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-white hover:text-gray-200">
                  <Link href="/dashboard">لوحة التحكم</Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-red-200 hover:text-red-100 hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4 rtl:ml-2 ltr:mr-2"/>
                  تسجيل الخروج
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[110] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[120] lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-[#8B0620] font-bold text-lg">القائمة</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#0BA6DF] text-white p-2 hover:bg-[#0BA6DF]/90 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="flex flex-col">
              <Link 
                href="/" 
                className="text-[#8B0620] hover:bg-[#8B0620]/10 transition-colors font-bold py-3 px-4 rounded-lg border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                href="/courses" 
                className="text-[#8B0620] hover:bg-[#8B0620]/10 transition-colors font-bold py-3 px-4 rounded-lg border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                الأقسام التدريبية
              </Link>
              <Link 
                href="/courses" 
                className="text-[#8B0620] hover:bg-[#8B0620]/10 transition-colors font-bold py-3 px-4 rounded-lg border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                الكورسات
              </Link>
              <Link 
                href="/consultations" 
                className="text-[#8B0620] hover:bg-[#8B0620]/10 transition-colors font-bold py-3 px-4 rounded-lg border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                الاستشارات
              </Link>
            </div>

            {/* User Actions for logged in users */}
            {session && (
              <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-[#8B0620] hover:bg-[#8B0620]/10 w-full justify-start"
                >
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4 rtl:ml-2 ltr:mr-2"/>
                    لوحة التحكم
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#8B0620] hover:text-[#8B0620]/80 hover:bg-[#8B0620]/10 w-full justify-start"
                >
                  <LogOut className="h-4 w-4 rtl:ml-2 ltr:mr-2"/>
                  تسجيل الخروج
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}; 