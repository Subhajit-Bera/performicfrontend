// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from './context/AuthContext';
// import { Toaster } from 'sonner';

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "EduElevate - Your Career Guidance Platform",
//   description: "Discover top universities, explore career paths, and apply to your dream college with EduElevate.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-slate-900 text-white`}>
//         <AuthProvider>
//           {children}
//           <Toaster richColors position="top-right" />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }




import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EduElevate - Your Career Guidance Platform",
  description: "Discover top universities, explore career paths, and apply to your dream college with EduElevate.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}