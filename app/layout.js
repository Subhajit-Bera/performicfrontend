import { Inter, Sora, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sora", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument", display: "swap" });

export const metadata = {
  title: {
    default: "PerFormic — Admissions & Career Consultancy",
    template: "%s · PerFormic",
  },
  description:
    "PerFormic Consultancy Services pairs every student with a dedicated counsellor, shortlists universities that fit their scores and budget, and manages every application deadline.",
  keywords: ["university admissions", "career counselling", "JEE", "NEET", "CAT", "Kolkata consultancy"],
  openGraph: {
    title: "PerFormic — Admissions & Career Consultancy",
    description: "Dedicated counsellors, verified university data and end-to-end application management.",
    siteName: "PerFormic Consultancy Services",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#05070F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${instrument.variable}`}>
      <body className="bg-background font-sans text-text">
        <AuthProvider>
          {children}
          <Toaster
            richColors
            closeButton
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(14,20,38,0.92)",
                border: "1px solid rgba(129,140,248,0.28)",
                color: "#EEF1FA",
                backdropFilter: "blur(14px)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}