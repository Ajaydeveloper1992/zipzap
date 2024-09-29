'use client';
import React, {Suspense} from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2Icon, ClockIcon, PhoneIcon } from "lucide-react"
import Header from '../frontend/components/header';
import Footer from '../frontend/components/footer';
import Loading from '../frontend/components/Loading';
export default function ThankYouPage() {
  // In a real application, you would fetch this data from your order management system
  const orderDetails = {
    orderNumber: "ORD-12345",
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: "30-45 minutes",
    total: 41.97,
    items: [
      { name: "Classic Wings", quantity: 2, price: 12.99 },
      { name: "BBQ Wings", quantity: 1, price: 13.99 },
    ],
  }

  return (
    <>
    <Suspense fallback={<Loading />}>  
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle2Icon className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <CardTitle className="text-3xl font-bold">Thank You for Your Order!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg">Your order has been successfully placed.</p>
                <p className="text-lg font-semibold">Order Number: {orderDetails.orderNumber}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span>{orderDetails.orderDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Delivery:</span>
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {orderDetails.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
              Track Your Order
            </Button>
            <div className="text-center">
              <p>Need help? Contact our support</p>
              <a href="tel:+11234567890" className="flex items-center justify-center text-primary hover:underline mt-1">
                <PhoneIcon className="w-4 h-4 mr-1" />
                +1 (123) 456-7890
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    <Footer/>
    </Suspense>
    </>
  )
}