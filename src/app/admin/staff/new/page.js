'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from '@/context/UserContext';
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateNewStaff() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    username: '',
    status: '',
    selectedRestaurants: [],
  });

  const [permissions, setPermissions] = useState({});
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        if (!response.ok) {
          console.error('Failed to fetch role', response.status);
          return;
        }
        const data = await response.json();
        setRoleOptions(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  let filteredRoles = '';
  if (user) {
    filteredRoles = roleOptions.filter(role => role.createdBy === user._id);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRoleChange = async (value) => {
    setFormData(prevData => ({
      ...prevData,
      role: value
    }));

    const response = await fetch(`/api/roles/${value}`);
    if (response.ok) {
      const roleData = await response.json();
      setPermissions(roleData.permissions);
    } else {
      console.error('Failed to fetch role permissions');
    }
  };

  const handleStatusChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      status: value
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    console.log(id);
    setFormData(prevData => {
      const selectedRestaurants = checked
        ? [...prevData.selectedRestaurants, id]
        : prevData.selectedRestaurants.filter(restaurant => restaurant !== id);
      
      console.log("Updated selectedRestaurants:", selectedRestaurants); // Debugging line
  
      return {
        ...prevData,
        selectedRestaurants,
      };
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User created successfully:', data);
        router.push('/admin/staff');
      } else {
        console.error('Error creating user:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Staff</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select name="role" onValueChange={handleRoleChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {filteredRoles && filteredRoles.map(role => (
                  <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" onValueChange={handleStatusChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="active" value="active">Active</SelectItem>
                <SelectItem key="deactivate" value="deactivate">Deactivate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
          {['restaurantA', 'restaurantB', 'restaurantC','restaurantD'].map((restaurant) => (
            <div key={restaurant} className="flex items-center">
              <Checkbox 
                id={restaurant} 
                checked={formData.selectedRestaurants.includes(restaurant)} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor={restaurant} className="text-sm font-medium leading-none">{restaurant.replace('restaurant', 'Restaurant ')}</label>
            </div>
          ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Create Staff</Button>
        </CardFooter>
      </form>
    </Card>
  );
}