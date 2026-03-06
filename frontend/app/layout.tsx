import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className="relative">
        <div className="w-xs h-screen fixed p-10 bg-layout">
          <main>
            <h1 className="text-center decoration-none">Easy Mock</h1>
            <div>
              <h1 className="text-center bg-primary mt-20 p-1 rounded-t-sm">Jeremy</h1>
              <ul className="bg-content rounded-b-sm pl-5 py-2">
                <li>Carpeta 1</li>
                <li>Carpeta 2</li>
                <li>Carpeta 3</li>
                <li>Carpeta 4</li>
              </ul>
            </div>
          </main>
        </div>
        {children}
      </body>
    </html>
  );
}
