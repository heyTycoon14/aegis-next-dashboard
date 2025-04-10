"use client";

import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { useEffect, type PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

export default function ClientLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [session, router]);

  // Hide sidebar & header on these pages:
  const hideSidebarAndHeader =
    pathname === "/auth/sign-in" ||
    pathname === "/auth/sign-up" ||
    pathname === "/not-found" ||
    pathname === "_error";

  const is404Page =
    pathname.startsWith("/_next/data") || pathname.includes("not-found");

  return (
    session.status != "loading" && (
      <div className="flex min-h-screen">
        {!hideSidebarAndHeader && !is404Page && <Sidebar />}
        <div className="w-full bg-black">
          {!hideSidebarAndHeader && !is404Page && <Header />}
          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    )
  );
}
