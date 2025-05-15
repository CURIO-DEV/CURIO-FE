"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import { ROUTES } from "@/constants/routes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar =
    pathname === "/" ||
    pathname === ROUTES.HOME ||
    pathname === ROUTES.SEARCH ||
    pathname === ROUTES.SNACK_NEWS ||
    pathname.startsWith(ROUTES.DETAIL);

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <Header />
      <div className="flex h-full min-w-360 px-20">
        <main className="h-full w-full">{children}</main>
        {showSidebar && <Sidebar />}
      </div>
    </div>
  );
}
