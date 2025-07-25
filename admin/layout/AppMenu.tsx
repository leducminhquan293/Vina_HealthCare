/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'next/navigation';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const { logout } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                // { label: 'Dịch vụ', icon: 'pi pi-fw pi-home', to: '/pages/services' } ,               
                { label: 'Dịch vụ', icon: 'pi pi-fw pi-home', to: '/services' },
                { label: 'Tin tức', icon: 'pi pi-fw pi-book', to: '/news' },
                { label: 'Câu hỏi', icon: 'pi pi-fw pi-book', to: '/faqs' },
                { label: 'Image slide', icon: 'pi pi-fw pi-book', to: '/image-slider' },
                { label: 'Homepage sections', icon: 'pi pi-fw pi-book', to: '/homepage-sections' },
                { label: 'Facilities', icon: 'pi pi-fw pi-book', to: '/facilities' },
                { label: 'Trust medical', icon: 'pi pi-fw pi-book', to: '/trusted-medical' },
                { label: 'Expert Shares', icon: 'pi pi-fw pi-users', to: '/expert-shares' }
            ],
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
            </ul>
            {/* <div className="p-3">
                <button className="p-button p-button-danger w-full" onClick={handleLogout}>
                    <i className="pi pi-sign-out mr-2" /> Đăng xuất
                </button>
            </div> */}
        </MenuProvider>
    );
};

export default AppMenu;
