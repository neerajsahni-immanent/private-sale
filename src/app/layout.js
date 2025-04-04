// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/common/Wallet/Web3Provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'bs-icon/icons.css'
import { Toaster } from "react-hot-toast";
import { MoonPayComponentProvider } from "@/components/MoonPayComponentProvider/MoonPayComponentProvider";

export const metadata = {
  title: "Private Sale",
  description: "Sphera Token Private Sale",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Web3Provider>
        <MoonPayComponentProvider
        apiKey={process.env.NEXT_PUBLIC_MOONPAY_API_KEY}
        debug={true}
        >
        <Toaster />
          {children}
          </MoonPayComponentProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
