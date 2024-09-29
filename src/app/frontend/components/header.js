'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { MenuIcon, ShoppingCartIcon, PlusIcon, MinusIcon, TrashIcon, Edit2Icon } from "lucide-react"
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import ZizZapPickupTime from './pickuptimeModal'
import CartView from './cartview'
// Mock cart items for demonstration
const initialCartItems = [
  { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
  { id: 2, name: "Product 2", price: 29.99, quantity: 2 },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false)
  const [orderTime, setOrderTime] = useState("Unspecified")

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleUpdateOrder = (orderDetails) => {
    setOrderTime(orderDetails.orderTime === 'ASAP' ? 'ASAP' : `${orderDetails.selectedDate} ${orderDetails.selectedTime}`)
    setIsEditOrderOpen(false)
  }

  return (
    <>
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu toggle */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-lg font-medium">Home</Link>
                <Link href="/cart" className="text-lg font-medium">Cart</Link>
                <Link href="/checkout" className="text-lg font-medium">Checkout</Link>
                <Link href="/thankyou" className="text-lg font-medium">Thank You</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <span className="sr-only">ZipZap</span>
              <div className="text-2xl font-bold text-primary">ZipZap</div>
            </Link>
          </div>

          {/* Right side - Cart icon */}
          <div className="flex items-center">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost"  size="icon" className="relative">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Button>
              </SheetTrigger>
            </Sheet>
            <CartView isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-1 px-4 flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <span className="text-sm font-medium mr-0">{orderTime}</span>
          <Button variant="ghost" size="sm" onClick={() => setIsEditOrderOpen(true)}>
            <Edit2Icon className="h-4 w-4 mr-1" />
            Please select a time
          </Button>
        </div>
        {/* <span className="text-sm font-medium">California Pizza Kitchen Short Pump</span> */}
      </div>
      {isEditOrderOpen && (
        <ZizZapPickupTime
          onClose={() => setIsEditOrderOpen(false)}
          onUpdate={handleUpdateOrder}
        />
      )}
    </header>
    </>
  )
}