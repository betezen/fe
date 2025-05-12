"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Providers } from "@/app/providers";

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Function to detect mobile devices
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <Providers>
      <div className="min-h-screen bg-[#111213] text-white">
        <main
          className={`container mx-auto ${
            isMobile ? "px-3 py-4" : "px-6 py-8"
          }`}
        >
          {/* Render content based on device type */}
          {isMobile ? (
            <div className="mobile-view">
              {/* Mobile-specific components */}
              {children}
            </div>
          ) : (
            <div className="web-view">
              {/* Web-specific components */}
              {children}
            </div>
          )}
        </main>
      </div>
    </Providers>
  );
}