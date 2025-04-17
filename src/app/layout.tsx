import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";
import NotificationList from "@/components/notification";

export const metadata: Metadata = {
  title: {
    template: "%s | Aegis admin dashboard",
    default: "Aegis admin dashboard",
  },
  description:
    "Aegis is your trusted partner in cybersecurity. We provide cutting-edge solutions to protect your digital assets.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <NotificationList />
          <NextTopLoader showSpinner={false} />
          <ClientLayout>{children}</ClientLayout> {/* Use Client Component */}
        </Providers>
      </body>
    </html>
  );
}
