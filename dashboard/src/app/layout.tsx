import { AuthProvider } from "@/data/contexts/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="layout-container">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
