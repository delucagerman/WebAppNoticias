import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TagList from "./components/TagList";
import { getData } from "./services/api";
import { processTags } from "./utils/dataProcessing";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WebApp de Noticias",
  description: "Explora nuestros artículos más recientes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getData();
  const articles = Array.isArray(data.articles) ? data.articles : [];
  const tags = processTags(articles);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="container mx-auto px-4">
          <Navbar />
          <div className="sm:flex-col md:flex-row lg:flex lg:space-x-6">
            <main className="w-full sm:w-full md:w-3/4 lg:w-5/6">
              {children}
            </main>
            <aside className="w-full sm:w-full md:w-1/4 lg:w-1/6 mt-8 sm:mt-8 md:mt-0 lg:mt-0">
              <h2 className="text-xl font-bold mb-4">Tags</h2>
              <TagList tags={tags} />
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}
