"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname ? ["/login", "/register"].includes(pathname) : false;

  return (
    <>
      {!hideNavbar && (
        <div>
            <Navbar />
            <div className="h-[10vh]"></div>
        </div>)}
      
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
}