"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = ["/", "/home", "/detail", "/search"].includes(pathname);

  return (
    <div className="flex h-screen flex-col justify-center">
      <Header />
      <div className="flex h-full min-w-360 px-20">
        <main className="h-full w-full">{children}</main>
        {showSidebar && <Sidebar />}
      </div>
    </div>
  );
}
