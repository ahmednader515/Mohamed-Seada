"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface RTLContextType {
  isRTL: boolean;
  setIsRTL: (isRTL: boolean) => void;
}

const RTLContext = createContext<RTLContextType>({
  isRTL: true,
  setIsRTL: () => {},
});

export const useRTL = () => useContext(RTLContext);

export const RTLProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRTL, setIsRTL] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Update document language when isRTL changes
    // Note: Direction is controlled via CSS to keep scrollbar on the right
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL, mounted]);

  return (
    <RTLContext.Provider value={{ isRTL, setIsRTL }}>
      {children}
    </RTLContext.Provider>
  );
}; 