"use client";

import Head from 'next/head';
import '/styles/globals.css'

export default function RootLayout({ children }) {
  
  return (
    <html lang="es">
      <body className="font-roboto">
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        </Head>
        <div className="flex flex-col min-h-screen mx-auto ">
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
