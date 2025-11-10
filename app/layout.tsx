import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
        <html lang="ru" style={{ background: '#0f172a' }}>
            <body className={inter.className} style={{ margin: 0 }}>
                {children}
            </body>
        </html>
    );
}
