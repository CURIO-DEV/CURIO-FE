"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/app/_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = ["/home", "/detail", "/search"].includes(pathname);

  console.log(pathname);

  return (
    <div className="flex h-screen justify-center">
      <div className="flex min-w-360 px-20">
        <main>{children}</main>
        {showSidebar && <Sidebar />}
      </div>
    </div>
  );
}
