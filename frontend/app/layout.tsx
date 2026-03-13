import "./globals.css";
import SideBar from './components/sideBar'
export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;

  
}>) {
  return (
    <html lang="en">
      <meta name="color-scheme" content="light dark" />
      <body className="relative">
        <SideBar></SideBar>
        {children}
      </body>
    </html>
  );
}
