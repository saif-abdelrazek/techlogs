import type { Metadata } from "next";
import "./globals.css";
import { MainProvider } from "@/contexts/MainContext";
import { JetBrains_Mono, Plus_Jakarta_Sans, Manrope } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TechLogs - Technology Blog Platform",
  description:
    "Discover the latest in technology, development insights, and industry trends on TechLogs - your premier destination for tech content.",
  keywords: ["technology", "blog", "development", "programming", "tech news"],
  authors: [{ name: "TechLogs Team" }],
  creator: "TechLogs",
  publisher: "TechLogs",
  openGraph: {
    title: "TechLogs - Technology Blog Platform",
    description:
      "Discover the latest in technology, development insights, and industry trends.",
    type: "website",
    locale: "en_US",
    siteName: "TechLogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechLogs - Technology Blog Platform",
    description:
      "Discover the latest in technology, development insights, and industry trends.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1987DD" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('techlogs-theme') === 'dark' || (localStorage.getItem('techlogs-theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${jetbrains.variable} ${manrope.variable} antialiased text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-primary-black transition-colors duration-300 min-h-screen`}
        suppressHydrationWarning
      >
        {/* Main Provider */}
        <MainProvider>
          <div className="relative min-h-screen flex flex-col">
            {/* Global background pattern */}
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-blue/3 rounded-full blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="flex-1 relative z-10">{children}</div>

            {/* Global scroll to top button - can be added later */}
            <div id="scroll-to-top-portal"></div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
