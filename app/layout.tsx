import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import NavBar from '@/components/NavBar';
import AuthProvider from '@/providers/AuthProvider';
import { Box, Container } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plastic Girls',
  description: 'The home for ultra plastic girls lovers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <AuthProvider>
            <NavBar />
            <Container maxWidth="lg">
              <Box m={3}>
                {children}
              </Box>
            </Container>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
