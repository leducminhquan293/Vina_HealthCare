'use client';

import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'PrimeReact Sakai',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'PrimeReact SAKAI-REACT',
        url: 'https://sakai.primereact.org/',
        description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user) router.push('/auth/login');
    }, [user]);
    if (!user) return null;
    return <Layout>{children}</Layout>;
}
