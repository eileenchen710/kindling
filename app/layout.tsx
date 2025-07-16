import './globals.css';
import '../styles/tailwind.css';
import ChakraProviders from './ChakraProviders';
import ColorModeToggle from '@/components/ColorModeToggle';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Company List Demo',
  description: 'Modern company list and detail demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="/cursor-dot.js" defer></script>
      </head>
      <body className="font-sans">
        <ChakraProviders>
          <ColorModeToggle />
          <SiteHeader />
          <main style={{ minHeight: '70vh' }}>{children}</main>
          <SiteFooter />
        </ChakraProviders>
      </body>
    </html>
  );
}
