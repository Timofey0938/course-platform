// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider, ToastContainer } from '@/components/ui';
import { Header } from '@/components/Header/Header';
import '../styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DevCourses - Мини-курсы по веб-разработке',
    description: 'Короткие, насыщенные курсы по веб-разработке',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" style={{ background: '#181818' }}>
            <body className={inter.className} style={{ margin: 0 }}>
                <AuthProvider>
                    <ToastProvider>
                        <Header />
                        {children}
                        <ToastContainer />
                    </ToastProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
