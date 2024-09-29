'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function ItemModal({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('small')
  const [spiceLevel, setSpiceLevel] = useState(null)

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change))
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', { name: "Chicken Hot And Sour Soup", quantity, size: selectedSize, spiceLevel })
    onClose()
  }

  const sizes = [
    { name: 'small', price: 7.00 },
    { name: 'medium', price: 11.00 },
    { name: 'large', price: 14.00 }
  ]

  const spiceLevels = ['MILD SPICY', 'MEDIUM SPICY', 'spicy']

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Chicken Hot And Sour Soup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
            {sizes.map(size => (
              <div key={size.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <RadioGroupItem value={size.name} id={size.name} />
                  <Label htmlFor={size.name} className="ml-2">{size.name}</Label>
                </div>
                <span>+${size.price.toFixed(2)}</span>
              </div>
            ))}
          </RadioGroup>
          
          <div>
            <Label className="text-sm font-medium">SPICE LEVEL</Label>
            <div className="mt-2 space-y-2">
              {spiceLevels.map(level => (
                <div key={level} className="flex items-center">
                  <Checkbox
                    id={level}
                    checked={spiceLevel === level}
                    onCheckedChange={() => setSpiceLevel(level)}
                  />
                  <Label htmlFor={level} className="ml-2">{level}</Label>
                </div>
              ))}
            </div>
            <div className="text-xs text-right">1 MAXIMUM</div>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>-</Button>
            <span className="mx-2">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>+</Button>
          </div>
          <Button onClick={handleAddToCart} className="bg-primary text-white">
            Add to order ${(sizes.find(s => s.name === selectedSize).price * quantity).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}