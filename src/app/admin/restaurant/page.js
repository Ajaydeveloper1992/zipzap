"use client";
import { useRouter } from "next/navigation";
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

const restaurants = [
  {
    id: 1,
    name: "Tasty Bites",
    url: "https://tastybites.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Gourmet Haven",
    url: "https://gourmethaven.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Spice Palace",
    url: "https://spicepalace.com",
    status: "Active",
  },
]

export default function RestaurantTable() {
  const router = useRouter();
  const handleAddRestaurant = () => {
    router.push("/admin/restaurant/new");
  }

  const handleEdit = (id) => {
    // Edit restaurant logic here
    router.push(`/admin/restaurant/edit/?id=${id}`);
  }

  const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this staff member?')) {
            try {
                const response = await fetch(`/api/auth/staff/${id}`, {
                    method: 'DELETE',
                });

                const result = await response.json();
                console.log(result);
                if (response.ok) {
                    console.log('Delete successful:', result);
                    // Remove the deleted staff from the state
                    setStaffData(prevData => prevData.filter(staff => staff._id !== id));
                } else {
                    throw new Error(result.error || 'Delete failed');
                }
            } catch (error) {
                console.error('Error deleting staff:', error);
                alert(error.message); // Show error to the user
            }
      }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Restaurants</h2>
        <Button onClick={handleAddRestaurant}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Restaurant
        </Button>
      </div>
      <Table>
        <TableCaption>A list of restaurants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Sr. No.</TableHead>
            <TableHead>Restaurant Name</TableHead>
            <TableHead>Restaurant URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant, index) => (
            <TableRow key={restaurant.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{restaurant.name}</TableCell>
              <TableCell>{restaurant.url}</TableCell>
              <TableCell>{restaurant.status}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(restaurant.id)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(restaurant.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}