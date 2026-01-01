import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Career timeline and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header
          name = "Anadi Aakar Dewan"
          githubUrl = "https://github.com/your-username"
          linkedinUrl = "https://www.linkedin.com/in/anadi-aakar-dewan-5087ba134/"
          email = "adewan9@asu.edu"
          resumePath = "/assets/resume.pdf"
        />
        {children}
      </body>
    </html>
  );
}