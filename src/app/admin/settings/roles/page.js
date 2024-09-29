'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
const permissionItems = [
  "Dashboard", "Products", "Orders", "Liveorders", "Customers", "Restaurant", 
  "Tables", "Kds", "Pos", "Staff", "Qrbuilder", 
  "Deliveryareas", "Plan", "Finances"
];

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);
  
  //console.log("Ajay"+userdata._id);

  const filteredRoles = roles.filter(role => role.createdBy === userdata._id);
  const handleAddRole = async () => {
    if (newRoleName.trim() ) {
      try {
        const response = await axios.post('/api/roles', {
          name: newRoleName.trim(),
          createdBy: userdata._id, // Include the user ID here
        });
  
        setRoles((prevRoles) => [...prevRoles, response.data]);
        setNewRoleName('');
      } catch (error) {
        console.error('Failed to add role', error);
      }
    }
  };
  
  const handleDeleteRole = async (id) => {
    const response = await fetch(`/api/roles/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setRoles((prevRoles) => prevRoles.filter(role => role.id !== id));
    } else {
      console.error('Failed to delete role');
    }
  };
  
  const handlePermissionChange = (item, action) => {
    setPermissions(prev => ({
      ...prev,
      [item]: {
        ...((prev[item] !== undefined) ? prev[item] : { add: false, view: false, update: false, delete: false }), // Initialize if undefined
        [action]: !prev[item]?.[action], // Toggle the specific action
      },
    }));
  };
   
  const handleSelectAll = (checked) => {
    setPermissions(
      Object.keys(permissions).reduce((acc, item) => ({
        ...acc,
        [item]: { add: checked, view: checked, update: checked, delete: checked }
      }), {})
    );
  };

  const handleSavePermissions = async () => {
    if (selectedRole) {
      const response = await fetch(`/api/roles/${selectedRole._id}/permissions`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissions }),
      });

      if (response.ok) {
        const updatedRole = await response.json();
        setRoles(prevRoles => prevRoles.map(role => role._id === updatedRole._id ? updatedRole : role));
        console.log('Permissions updated successfully');
        setSelectedRole(null); // Close the dialog
      } else {
        console.error('Failed to update permissions', await response.text());
      }
    } else {
      console.error('No role selected');
    }
  };
   
  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    const response = await fetch(`/api/roles/${role._id}`);
    if (response.ok) {
      const roleData = await response.json();
      
      // Ensure all permission items are initialized
      const initializedPermissions = permissionItems.reduce((acc, item) => {
        acc[item] = roleData.permissions[item] || { add: false, view: false, update: false, delete: false };
        return acc;
      }, {});
  
      setPermissions(initializedPermissions); // Set the permissions from the database
    } else {
      console.error('Failed to fetch role permissions');
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Roles & Permissions</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Manage Role</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Manage Role</DialogTitle>
              </DialogHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles && filteredRoles.map((role, index) => (
                    <TableRow key={role.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{role.name}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRole(role.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center space-x-2 mt-4">
                <Input 
                  placeholder="Role Name" 
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
                <Button onClick={handleAddRole}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {filteredRoles && filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.members} Member(s)</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleRoleSelect(role)}>Permissions</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedRole && (
        <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedRole.name} Permissions</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Checkbox
                      checked={permissions && Object.values(permissions).every(p => Object.values(p).every(v => v))}
                      onCheckedChange={handleSelectAll}
                    /> Select All
                  </TableHead>
                  <TableHead>Add</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {permissionItems.map((item) => (
                <TableRow key={item}>
                  <TableCell>{item}</TableCell>
                  {['add', 'view', 'update', 'delete'].map((action) => (
                    <TableCell key={action}>
                      <Switch
                        checked={permissions && permissions[item]?.[action] || false} // Safely access the permission
                        onCheckedChange={() => handlePermissionChange(item, action)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            </Table>
            <div className="mt-4">
              <Button onClick={handleSavePermissions}>Save Permissions</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}