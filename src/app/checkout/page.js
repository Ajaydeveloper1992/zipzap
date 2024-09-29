'use client';
import React, { useState,Suspense} from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Header from '../frontend/components/header';
import Footer from '../frontend/components/footer';
import Loading from '../frontend/components/Loading';
export default function CheckoutPage() {
  const [orderItems] = useState([
    { id: 1, name: "Classic Wings", quantity: 2, price: 12.99 },
    { id: 2, name: "BBQ Wings", quantity: 1, price: 13.99 },
  ])

  const subtotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const tax = subtotal * 0.13 // Assuming 13% tax
  const total = subtotal + tax

  return (
    <>
    <Suspense fallback={<Loading />}>  
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expDate">Expiration Date</Label>
                    <Input id="expDate" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    <Footer/>
    </Suspense>
  </>
  )
}