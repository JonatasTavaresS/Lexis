import Navbar from "./components/Nav/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="w-full min-h-screen bg-white">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
