import { Inter, Sora, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#05070F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })()`,
          }}
        />
      </head>
      <body className="bg-background font-sans text-text">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              richColors
              closeButton
              position="top-right"
              toastOptions={{
                style: {
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  backdropFilter: "blur(14px)",
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}