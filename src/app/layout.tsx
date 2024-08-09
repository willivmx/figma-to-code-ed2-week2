import type { Metadata } from "next";
import "./globals.css";
import TopBanner from "@/components/top-banner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "BALLAMAS",
  icons: {
    icon: [
      {
        url: "/assets/vectors/logos/favicon.svg",
        href: "/assets/vectors/logos/favicon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"font-[Archivo-Regular] bg-b-white text-b-black"}>
        <div className={"fixed top-0 left-0 w-full z-[10]"}>
          <TopBanner />
          <Navbar />
        </div>
        <div
          className={
            "w-full px-5 md:px-[46px] lg:px-[120px] pt-[165px] md:pt-[205px] pb-10 md:pb-20"
          }
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
