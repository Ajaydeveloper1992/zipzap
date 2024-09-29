"use client"; // This makes the component a Client Component
import { useRouter } from 'next/navigation';
import { useState,useEffect} from 'react';
import axios from 'axios';
import Link from "next/link";
import {
    Cloud,
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SettingMenu() {
    const router = useRouter(); // Use the router hook
    const [date, setDate] = useState();
    // Logout Request
    const logout = async () => {
        try {
            await axios.get('/api/auth/logout');
            router.push('/login');
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
      const newDate = new Date(); // Or any dynamic data fetching logic
      setDate(newDate);
    }, []);
  
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><Settings className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <Link href="/admin/settings/profile" className="font-semibold text-primary">
                            <span>Profile</span>
                        </Link>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <Link href="/admin/settings" className="font-semibold text-primary">
                            <span>Settings</span>
                        </Link>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={logout}>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}