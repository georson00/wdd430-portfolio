import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="en">
          <body className="bg-gray-50 dark:bg-gray-900">
            <Header /> {/* Global header component */}
            {children}
            <Footer /> {/* Global footer component */}
          </body>
        </html>
      );
}