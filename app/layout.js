import { Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import { Rubik } from "next/font/google";
import { AuthProvider } from "@/app/_context/AuthContext";

export const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  title: "SPACEJAT ",
  description: "SPACEJAT by Ahmed Mansour as a Frontend task.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} `}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
