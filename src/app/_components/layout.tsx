"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = ["/home", "/detail", "/search"].includes(pathname);

  return (
    <div className="flex h-screen justify-center">
      <div className="flex min-w-360 px-20">
        <main className="h-full w-full">{children}</main>
        {showSidebar && <Sidebar />}
      </div>
    </div>
  );
}
