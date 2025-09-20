import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
