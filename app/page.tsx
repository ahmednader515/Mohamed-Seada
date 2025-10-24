"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, BookOpen, Award, ChevronDown, Heart, Shield, CheckCircle, GraduationCap, Award as AwardIcon, Building2, MessageCircle, UserCheck, Target, Lightbulb, BookOpenCheck, Users2, Calendar, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import ServicesCarousel from "@/components/services-carousel";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Custom Swiper styles
const swiperStyles = `
  .swiper-pagination {
    left: 10px !important;
    right: auto !important;
    top: 50% !important;
    bottom: auto !important;
    transform: translateY(-50%) !important;
    width: auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    z-index: 30 !important;
  }
  
  @media (min-width: 768px) {
    .swiper-pagination {
      left: 20px !important;
    }
  }
  
  .swiper-pagination-bullet {
    background: rgba(191, 9, 47, 0.3) !important;
    opacity: 1 !important;
    width: 10px !important;
    height: 10px !important;
    margin: 5px 0 !important;
  }
  
  @media (min-width: 768px) {
    .swiper-pagination-bullet {
      width: 12px !important;
      height: 12px !important;
      margin: 6px 0 !important;
    }
  }
  
  .swiper-pagination-bullet-active {
    background: #8B0620 !important;
    transform: scale(1.2) !important;
  }
`;

export default function HomePage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollIndicator(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the hero section is visible
      }
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      const offset = servicesSection.offsetTop - 80; // Adjust for navbar height
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  const specialEducationCourses = [
    { name: "دورة التربية الخاصة", icon: GraduationCap, description: "برنامج شامل في أسس ومبادئ التربية الخاصة" },
    { name: "كورس التوحد", icon: Target, description: "تدريب متخصص في التعامل مع أطفال التوحد" },
    { name: "التخاطب واللغة", icon: MessageCircle, description: "تطوير مهارات التخاطب واللغة للأطفال" },
    { name: "صعوبات التعلم", icon: BookOpenCheck, description: "تشخيص وعلاج صعوبات التعلم المختلفة" },
    { name: "الشلل الدماغي", icon: UserCheck, description: "برامج تأهيل وتدريب لأطفال الشلل الدماغي" },
    { name: "متلازمة داون", icon: Heart, description: "تدريب متخصص في رعاية أطفال متلازمة داون" },
    { name: "التقييم والتشخيص", icon: CheckCircle, description: "طرق تقييم وتشخيص الحالات الخاصة" },
    { name: "البرامج التعليمية", icon: BookOpen, description: "تصميم برامج تعليمية فردية" },
    { name: "التدخل المبكر", icon: Lightbulb, description: "برامج التدخل المبكر للأطفال" },
    { name: "السلوك التكيفي", icon: Shield, description: "تطوير المهارات السلوكية والتكيفية" },
    { name: "التواصل البديل", icon: MessageCircle, description: "طرق التواصل البديل والمساعد" },
    { name: "التدريب المهني", icon: GraduationCap, description: "برامج التدريب المهني للشباب" }
  ];

  const consultationServices = [
    { name: "استشارات فردية", icon: UserCheck, description: "استشارات شخصية مع الدكتور محمد ساده" },
    { name: "تقييم الحالات", icon: CheckCircle, description: "تقييم شامل للحالات الخاصة" },
    { name: "وضع الخطط العلاجية", icon: Target, description: "تصميم خطط علاجية مخصصة" },
    { name: "متابعة التقدم", icon: BookOpenCheck, description: "متابعة دورية لتطور الحالات" }
  ];

  const heroSlides = [
    {
      title: "الدكتور محمد ساده",
      subtitle: "خبير متخصص في التربية الخاصة والعلاج التخاطبي",
      description: "نقدم دورات تدريبية متخصصة في التوحد، التخاطب، صعوبات التعلم والشلل الدماغي ومتلازمة داون مع شهادات معتمدة",
      image: "/slide-1.png"
    },
    {
      title: "دورات التربية الخاصة",
      subtitle: "برامج تدريبية متخصصة ومتقدمة",
      description: "تعلم أحدث الطرق في التعامل مع الأطفال ذوي الاحتياجات الخاصة وتطوير مهاراتك المهنية",
      image: "/slide-2.png"
    },
    {
      title: "الاستشارات المتخصصة",
      subtitle: "استشارات فردية مع خبراء متخصصين",
      description: "احصل على استشارات مخصصة لتقييم الحالات ووضع الخطط العلاجية المناسبة",
      image: "/slide-3.png"
    }
  ];

  return (
    <div className="h-full w-full bg-background">
      <style dangerouslySetInnerHTML={{ __html: swiperStyles }} />
      
      {/* Fixed Header with Banner and Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-[#3DBBEB] from-25% via-[#B5215E] via-50% to-[#ff002b] to-100% text-white py-3 md:py-4 text-center text-xs sm:text-sm md:text-base font-medium px-2">
          <p className="font-bold">كورس التربية الخاصة مجاناً 100% ! استخدم كود الخصم : SADA100 وابدأ التعلم الآن</p>
        </div>
        
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <section id="hero-section" className="relative overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-screen"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-screen flex items-center justify-center pt-20 md:pt-32 pb-8">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"></div>
                  <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200/20 rounded-full blur-lg"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-[80%]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-4 items-center max-w-7xl mx-auto w-full">
                    {/* Left side - Text content */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-right space-y-3 md:space-y-6 order-2 lg:order-1"
                    >
                      <div className="space-y-2 md:space-y-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800">
                          {slide.title}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-bold">
                          {slide.subtitle}
                        </p>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-bold">
                          {slide.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                        <Button size="lg" asChild className="bg-[#8B0620] hover:bg-[#8B0620]/90 text-white text-sm md:text-base lg:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                          <Link href="/sign-up">
                            ابدأ رحلتك الآن <ArrowRight className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" onClick={scrollToServices} className="border-[#0BA6DF] text-[#0BA6DF] hover:bg-[#0BA6DF] hover:text-white text-sm md:text-base lg:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                          اكتشف دوراتنا
                        </Button>
                      </div>
                    </motion.div>

                    {/* Right side - Image */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex justify-center lg:justify-start order-1 lg:order-2"
                    >
                      <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-md mx-auto lg:mx-0">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain"
                          priority
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Contact Icons */}
        <div className="fixed left-4 bottom-4 flex flex-col space-y-3 z-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              opacity: { delay: 1.2, duration: 0.5 },
              x: { delay: 1.2, duration: 0.5 },
              rotate: { 
                delay: 2,
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.5
              },
              scale: {
                delay: 2,
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.5
              }
            }}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#0BA6DF] group transition-colors overflow-hidden"
            onClick={() => window.open('https://wa.me/20123456789', '_blank')}
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              opacity: { delay: 1.4, duration: 0.5 },
              x: { delay: 1.4, duration: 0.5 },
              rotate: { 
                delay: 2.2,
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1
              },
              scale: {
                delay: 2.2,
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1
              }
            }}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#0BA6DF] group transition-colors"
            onClick={() => window.open('tel:+20123456789', '_self')}
          >
            <Phone className="h-6 w-6 text-[#0BA6DF] group-hover:text-white transition-colors" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 cursor-pointer hidden md:flex"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={scrollToServices}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-8 w-8 text-gray-600" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <ChevronDown className="h-8 w-8 text-gray-600" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <ChevronDown className="h-8 w-8 text-gray-600" />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Courses Section */}
      <section id="services-section" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">دوراتنا التدريبية</h2>
            <p className="text-muted-foreground text-lg">برامج تدريبية متخصصة في التربية الخاصة والعلاج التخاطبي</p>
          </motion.div>

          {/* Special Education Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <ServicesCarousel 
              services={specialEducationCourses} 
              title="دورات التربية الخاصة" 
            />
          </motion.div>

          {/* Consultation Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ServicesCarousel 
              services={consultationServices} 
              title="خدمات الاستشارات" 
            />
          </motion.div>
        </div>
      </section>

      {/* About Dr. Mohamed Sada Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">عن الدكتور محمد ساده</h2>
            <p className="text-muted-foreground text-lg">خبير متخصص في التربية الخاصة والعلاج التخاطبي</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#8B0620]">الخبرة المهنية</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  الدكتور محمد ساده هو خبير متخصص في مجال التربية الخاصة والعلاج التخاطبي، 
                  مع أكثر من 15 عاماً من الخبرة في العمل مع الأطفال ذوي الاحتياجات الخاصة.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#8B0620]">التخصصات</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-[#8B0620]" />
                    <span>التوحد</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-[#8B0620]" />
                    <span>التخاطب</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-[#8B0620]" />
                    <span>صعوبات التعلم</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-[#8B0620]" />
                    <span>الشلل الدماغي</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-[#8B0620]" />
                    <span>متلازمة داون</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-[#8B0620]" />
                    <span>التدخل المبكر</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-[#8B0620]/20 to-[#8B0620]/5 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-[#8B0620] to-[#8B0620]/80 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-32 w-32 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications and Accreditations Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الشهادات والاعتمادات</h2>
            <p className="text-muted-foreground text-lg">شهادات معتمدة من أرقى المؤسسات التعليمية والطبية</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Educational Certification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-[#8B0620]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-[#8B0620]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#8B0620]">دكتوراه في التربية الخاصة</h3>
              <p className="text-sm text-muted-foreground">تخصص التخاطب واللغة</p>
            </motion.div>

            {/* Professional License */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-[#8B0620]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AwardIcon className="h-8 w-8 text-[#8B0620]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#8B0620]">رخصة مزاولة المهنة</h3>
              <p className="text-sm text-muted-foreground">معالج تخاطب معتمد</p>
            </motion.div>

            {/* International Certification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-[#8B0620]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#8B0620]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#8B0620]">شهادة دولية</h3>
              <p className="text-sm text-muted-foreground">في التربية الخاصة والتوحد</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار منصتنا؟</h2>
            <p className="text-muted-foreground text-lg">نقدم تدريباً متميزاً في التربية الخاصة والعلاج التخاطبي</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-[#8B0620]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#8B0620]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">خبرة علمية متخصصة</h3>
              <p className="text-muted-foreground">دكتوراه في التربية الخاصة مع أكثر من 15 عاماً من الخبرة العملية</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-[#8B0620]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users2 className="h-8 w-8 text-[#8B0620]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">تدريب عملي متقدم</h3>
              <p className="text-muted-foreground">برامج تدريبية عملية مع حالات حقيقية ومتابعة مستمرة</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-[#8B0620]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AwardIcon className="h-8 w-8 text-[#8B0620]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">شهادات معتمدة</h3>
              <p className="text-muted-foreground">شهادات معتمدة من مؤسسات تعليمية وطبية مرموقة</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8B0620] to-[#8B0620]">
        <div className="container mx-auto px-4 max-w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">ابدأ رحلتك التعليمية مع الدكتور محمد ساده</h2>
            <p className="text-white/80 mb-8 text-lg max-w-3xl mx-auto">
              انضم إلى دوراتنا التدريبية المتخصصة في التربية الخاصة والعلاج التخاطبي، 
              واحصل على شهادات معتمدة تؤهلك للعمل في هذا المجال المهم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-[#8B0620] hover:bg-gray-100 text-lg px-8 py-4">
                <Link href="/sign-up">
                  سجل في الدورات الآن <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#8B0620] text-lg px-8 py-4">
                احجز استشارة
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
