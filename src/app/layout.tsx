import type { Metadata } from 'next';
import './globals.scss';
import Footer from './_components/footer';
import CookieBanner from './_components/cookie-banner';

export const metadata: Metadata = {
  title: 'NHS login Help Centre',
  description:
    'The NHS login help centre is where you can find helpful information, guidance, and support for issues with NHS login.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="6Qm3LCuWz9g_8OTWyr_QoGJGPhwVWx49ouloSmsMyPk"
        />

        {/* Favicons */}
        <link rel="shortcut icon" href="/images/favicons/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/images/favicons/favicon.svg" color="#005eb8" />
        <link rel="icon" sizes="192x192" href="/images/favicons/favicon-192x192.png" />
      </head>
      <body>
        <CookieBanner></CookieBanner>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
