import type { Metadata } from "next";
import localFont from "next/font/local";
import { Carter_One } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Layout from "./_components/layout";
import Providers from "./providers";
import { Toaster } from "sonner";

const pretendard = localFont({
  src: "_styles/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const carterOne = Carter_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-carter",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Curio",
  description:
    "읽고 싶은 뉴스만 골라, 원하는 방식으로 요약받는 맞춤형 뉴스 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${carterOne.variable} ${roboto.variable} font-pretendard`}
      >
        <Providers>
          <Layout>{children}</Layout>
          <Toaster></Toaster>
        </Providers>
      </body>
    </html>
  );
}
