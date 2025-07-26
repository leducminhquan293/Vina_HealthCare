'use client';

import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { user } = useAuth();
    const router = useRouter();
    // useEffect(() => {
    //     if (!user) router.push('/auth/login');
    // }, [user]);
    // if (!user) return null;
    return <Layout>{children}</Layout>;
}
