'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

// Mock data for products
const products = Array.from({ length: 50 }, (_, i) => ({
  id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books', 'Home & Garden'][Math.floor(Math.random() * 4)],
  price: (Math.random() * 500 + 10).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  status: ['In Stock', 'Low Stock', 'Out of Stock'][Math.floor(Math.random() * 3)],
}))

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-500'
      case 'Low Stock': return 'bg-yellow-500'
      case 'Out of Stock': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const handleAddNew = () => {
    console.log('Add new product')
    // Implement add new product functionality
  }

  const handleEdit = (id) => {
    console.log('Edit product', id)
    // Implement edit product functionality
  }

  const handleDelete = (id) => {
    console.log('Delete product', id)
    // Implement delete product functionality
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(product.status)} text-white`}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}