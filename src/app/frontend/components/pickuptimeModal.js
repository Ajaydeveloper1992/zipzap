'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function ZizZapPickupTime({ onClose, onUpdate }) {

  const [orderType, setOrderType] = useState('Pickup')
  const [orderTime, setOrderTime] = useState('ASAP')
  const [selectedDate, setSelectedDate] = useState('Today')
  const [selectedTime, setSelectedTime] = useState('8:00 PM')

  const handleUpdate = () => {
    onUpdate({ orderType, orderTime, selectedDate, selectedTime })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Order Type</h3>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option>Pickup</option>
              <option>Delivery</option>
            </select>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Order Time</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => setOrderTime('ASAP')}
                className={`p-2 border rounded-md ${
                  orderTime === 'ASAP' ? 'bg-gray-200' : 'bg-white'
                }`}
              >
                ASAP
              </button>
              <button
                onClick={() => setOrderTime('Later')}
                className={`p-2 border rounded-md ${
                  orderTime === 'Later' ? 'bg-gray-200' : 'bg-white'
                }`}
              >
                Later
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option>Today</option>
                <option>Tomorrow</option>
                {/* Add more date options as needed */}
              </select>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option>8:00 PM</option>
                <option>8:30 PM</option>
                <option>9:00 PM</option>
                {/* Add more time options as needed */}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}