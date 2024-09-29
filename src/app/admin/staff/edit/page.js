'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from '@/context/UserContext';
export default function Edit() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  let id = searchParams.get("id");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    status: '',
    selectedRestaurants: []
  });

 const [roleOptions, setRoleOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/auth/staff/getstaff/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstName: data.fname,
            lastName: data.lname,
            username: data.username,
            email: data.email,
            phoneNumber: data.phone,
            password: '', // Security: Do not fetch the password
            role: data.role?.id || '',
            status: data.status || '',
            selectedRestaurants: data.restaurants || []
          });
        } else {
          throw new Error('Failed to fetch staff data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [id]);

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

  let filteredRoles = [];
  if (user) {
      filteredRoles = roleOptions.filter(role => role.createdBy === user._id);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prevData => ({ ...prevData, role: value }));
  };

  const handleStatusChange = (value) => {
    setFormData(prevData => ({ ...prevData, status: value }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      selectedRestaurants: checked
        ? [...prevData.selectedRestaurants, id]
        : prevData.selectedRestaurants.filter(restaurant => restaurant !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/staff/edit/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          ...formData,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Update successful:', result);
        // Optionally redirect or show a success message
        router.push('/admin/staff'); // Redirect to a success page if necessary
      } else {
        throw new Error(result.error || 'Update failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Staff</CardTitle>
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
            <Select name="role" onValueChange={handleRoleChange} value={formData.role} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {filteredRoles.map(role => (
                  <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" onValueChange={handleStatusChange} value={formData.status} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deactivate">Deactivate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Restaurants</Label>
            <div className="flex flex-col space-y-2">
              {['restaurantA', 'restaurantB', 'restaurantC', 'restaurantD'].map((restaurant) => (
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
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Update Staff</Button>
        </CardFooter>
      </form>
    </Card>
  );
}