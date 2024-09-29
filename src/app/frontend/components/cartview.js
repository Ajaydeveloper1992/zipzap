import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { PlusIcon, MinusIcon, XIcon } from "lucide-react"

const initialCartItems = [
  { id: 1, name: "CATERING BOLOGNESE PASTA", price: 85.00, quantity: 1 },
  { id: 2, name: "GARLIC BREAD", price: 5.99, quantity: 2 },
  { id: 3, name: "GARLIC BREAD", price: 5.99, quantity: 2 },
  { id: 4, name: "GARLIC BREAD", price: 5.99, quantity: 2 },
  { id: 5, name: "GARLIC BREAD", price: 5.99, quantity: 2 },
  { id: 6, name: "GARLIC BREAD", price: 5.99, quantity: 2 },
]

export default function CartView({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [animatedItemId, setAnimatedItemId] = useState(null)

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
    if (change > 0) {
      setAnimatedItemId(id)
    }
  }

  useEffect(() => {
    if (animatedItemId) {
      const timer = setTimeout(() => setAnimatedItemId(null), 300)
      return () => clearTimeout(timer)
    }
  }, [animatedItemId])

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const estimatedTax = subtotal * 0.1 // Assuming 10% tax rate
  const total = subtotal + estimatedTax

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:max-w-[500px]">
         
        <SheetHeader className="flex justify-between items-center">
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        <div className="text-sm text-muted-foreground">Later</div>
        <div className="my-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2">🍽️</span>
              <div>
                <div className="font-medium">Utensils and Condiments</div>
                <div className="text-sm text-muted-foreground">These items wont be added unless you ask.</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Add</Button>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {cartItems.map((item) => (
            <div key={item.id} className={`flex justify-between items-center transition-all duration-300 ${animatedItemId === item.id ? 'bg-green-100' : ''}`}>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="font-medium">May We Suggest</div>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Tax</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>
          <Separator className="my-4" />
          <SheetFooter>
            <Button className="w-full">
              Checkout ${total.toFixed(2)}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}