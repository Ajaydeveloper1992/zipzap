'use client'
import { usePathname } from 'next/navigation';
import { useState,useEffect } from 'react'
import Link from "next/link";
export default function Sidebar(){
    const pathname = usePathname()
    const getLinkClass = (path) => {
        return pathname  === path ? 'font-semibold text-primary' : 'text-muted-foreground';
    }; 
    return (
        <>
        <Link href="/admin/settings/" className={getLinkClass('/admin/settings/')}>
           General
        </Link>
        <Link href="/admin/settings/profile" className={getLinkClass('/admin/settings/profile')}>
            Profile
        </Link>
        <Link href="/admin/settings/roles" className={getLinkClass('/admin/settings/roles')}>
           Role Management
        </Link>
        </>
    );
}