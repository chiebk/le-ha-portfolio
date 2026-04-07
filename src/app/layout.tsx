import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
});

const notoSerif = Noto_Serif({
  variable: "--font-headline",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LÊ HÀ ARCHITECTURE | Kiến trúc & Nội thất",
  description: "Chúng tôi không chỉ xây dựng công trình, chúng tôi kiến tạo những trải nghiệm sống tinh tế thông qua ngôn ngữ kiến trúc tối giản và hiện đại.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${inter.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
