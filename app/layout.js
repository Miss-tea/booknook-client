import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "BookNook | Home",
  description:
    "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Sets the saved theme before the page paints, so there is no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`,
          }}
        />
      </head>
      <body className={`${poppins.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}