"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronDown, Package, ShoppingCart, Users, Grid, DollarSign, MapPin, Utensils, TableCellsMerge, Airplay, Briefcase, QrCode, RadioTower, NotebookPen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import { useUser } from '@/context/UserContext';
export default function Sidebar() {
  //const { user } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  const [permissions, setPermissions] = useState({});
  const [userdata, setUserdata] = useState("nothing");

  const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        setUserdata(res.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

   useEffect(() => {
    const fetchPermissions = async () => {
      if (userdata) {
        const user_role = userdata.role; // Adjust based on your session structure
        try {
          const response = await axios.get(`/api/roles/${user_role}`);
          if (response.data && response.data.permissions) {
            setPermissions(response.data.permissions);
          }
        } catch (error) {
          console.error('Error fetching permissions:', error);
        }
      }
    };

    fetchPermissions();
  }, [userdata]);
  console.log(userdata);
  const menuItems = [
    { name: "Dashboard", href: "/admin/", icon: <Grid className="mr-2 h-4 w-4" />, permission: "Dashboard" },
    { name: "Products", href: "/admin/products/all-products", icon: <Package className="mr-2 h-4 w-4" />, permission: "Products" },
    { name: "Orders", href: "/admin/orders/all-orders", icon: <ShoppingCart className="mr-2 h-4 w-4" />, permission: "Orders" },
    { name: "Live Orders", href: "/admin/orders/live-orders", icon: <RadioTower className="mr-2 h-4 w-4" />, permission: "Liveorders" },
    { name: "Customers", href: "/admin/customers/all-customers", icon: <Users className="mr-2 h-4 w-4" />, permission: "Customers" },
    { name: "Restaurant", href: "/admin/restaurant", icon: <Utensils className="mr-2 h-4 w-4" />, permission: "Restaurant" },
    { name: "Tables", href: "/admin/tables", icon: <TableCellsMerge className="mr-2 h-4 w-4" />, permission: "Tables" },
    { name: "KDS", href: "/admin/kds", icon: <Briefcase className="mr-2 h-4 w-4" />, permission: "Kds" },
    { name: "POS", href: "/admin/pos", icon: <Airplay className="mr-2 h-4 w-4" />, permission: "Pos" },
    { name: "Staff", href: "/admin/staff", icon: <Users className="mr-2 h-4 w-4" />, permission: "Staff" },
    { name: "QR Builder", href: "/admin/qr-builder", icon: <QrCode className="mr-2 h-4 w-4" />, permission: "Qrbuilder" },
    { name: "Delivery Areas", href: "/admin/delivery-areas", icon: <MapPin className="mr-2 h-4 w-4" />, permission: "Deliveryareas" },
    { name: "Plan", href: "/admin/plan", icon: <NotebookPen className="mr-2 h-4 w-4" />, permission: "Plan" },
    { name: "Finances", href: "/admin/finances", icon: <DollarSign className="mr-2 h-4 w-4" />, permission: "Finances" },
  ];

  return (
    <aside className={`pt-20 pb-10 px-4 border-r overflow-x-hidden overflow-y-auto shrink-0 bg-background transition-all ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${isOpen ? 'block' : 'hidden'}`}>User : {userdata.fname}</h2>
        <Button onClick={toggleSidebar} variant="ghost" className="p-2">
          <BsArrowLeftShort className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </Button>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => {
          const hasPermission = permissions[item.permission]?.view; // Check if user has permission to view
          return hasPermission ? (
            <Collapsible key={item.name}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className={`w-full justify-between ${isOpen ? 'text-left' : 'text-center'}`}>
                  <div className="flex items-center">
                    {item.icon}
                    {isOpen && item.name}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className={`pl-6 space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
                <Link href={item.href} className={`block py-1 text-sm hover:text-primary ${isOpen ? 'block' : 'hidden'}`}>
                  {item.name}
                </Link>
              </CollapsibleContent>
            </Collapsible>
          ) : null;
        })}
      </nav>
    </aside>
  );
}
