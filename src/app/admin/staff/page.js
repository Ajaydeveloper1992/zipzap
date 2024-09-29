'use client';
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal, Pencil, Trash } from "lucide-react";

export default function ProductList() {
  const router = useRouter();
  const [staffData, setStaffData] = useState([]); // State to hold staff data

  // Fetch staff data from API
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('/api/auth/staff/view'); // Update with your actual endpoint
        const data = await response.json();
        setStaffData(data); // Assuming the response is an array of staff objects
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
    fetchStaffData();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit staff with id: ${id}`);
    router.push(`/admin/staff/edit/?id=${id}`);
  };
  
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
};

const handleNewStaff = () => {
  router.push("/admin/staff/new");
};
  
return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Staff</h1>
        <Button onClick={handleNewStaff}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Staff
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {staffData && staffData.map((staff) => (
            <TableRow key={staff._id}> {/* Assuming staff has a unique _id */}
              <TableCell className="font-medium">{staff.fname} {staff.lname}</TableCell>
              <TableCell>{staff.role?.name || 'N/A'}</TableCell> {/* Adjust according to your role structure */}
              <TableCell>{staff.status || 'N/A'}</TableCell>
              <TableCell>{new Date(staff.createdAt).toLocaleString()}</TableCell> {/* Format date if necessary */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(staff._id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(staff._id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}