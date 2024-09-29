'use client'
import React, { useRef, useState,useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCategory } from './CategoryContext';
// Define menu items with multiple categories
import { ItemModal } from './ItemModal';
const menuItems = [
  {
    id: "1",
    name: "Classic Wings",
    description: "Our signature crispy wings",
    price: 12.99,
    imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
    categories: ["ZipZap FAVORITES", "NEW ITEMS"],
  },
  {
    id: "2",
    name: "Boneless Wings",
    description: "Tender, juicy boneless wings",
    price: 11.99,
    imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
    categories: ["ZipZap FAVORITES"],
  },
  {
    id: "3",
    name: "BBQ Wings",
    description: "Wings tossed in our house BBQ sauce",
    price: 13.99,
    imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
    categories: ["NEW ITEMS", "PIZZAS"],
  },
  {
    id: "4",
    name: "Garlic Parmesan Wings",
    description: "Wings with a creamy garlic parmesan coating",
    price: 14.99,
    imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
    categories: ["PIZZAS"],
  },
  {
      id: "5",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ["PIZZAS"],
   },
   {
      id: "6",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ["PIZZAS",'SOUPS'],
    },
    {
      id: "7",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ['SOUPS'],
    },
    {
      id: "8",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ['SOUPS'],
    },
    {
      id: "9",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ['SOUPS'],
    },
    {
      id: "10",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ['SOUPS'],
    },
    {
      id: "11",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ['SOUPS'],
    },
    {
      id: "12",
      name: "Garlic Parmesan Wings1",
      description: "Wings with a creamy garlic parmesan coating",
      price: 14.99,
      imageUrl: "https://g-hhdapkv.vusercontent.net/placeholder.svg?height=200&width=200",
      categories: ['SOUPS'],
    },
  // Add more items as needed
];
const mockItem = {
  name: "Sample Item",
  description: "This is a sample item description.",
  price: 20.00
};
export default function Items() {
      const { activeCategory } = useCategory();
      const [isModalOpen, setModalOpen] = useState(false);
      // Collect all unique categories
      const allCategories = Array.from(
        new Set(menuItems.flatMap(item => item.categories))
      );
    
      // Group items by category
      const groupedItems = allCategories.reduce((acc, category) => {
        acc[category] = menuItems.filter(item => item.categories.includes(category));
        return acc;
      }, {});
    
      const categoryRefs = useRef({}); // Object to store refs for each category section
      //const [activeCategory, setActiveCategory] = useState(allCategories[0]);
      const scrollToCategory = (category) => {
            const categoryRef = categoryRefs.current[category];
            if (categoryRef) {
              categoryRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          };
      useEffect(() => {
            scrollToCategory(activeCategory);
          }, [activeCategory]);

      const openModal = () =>{ 
           setModalOpen(true);
         }
      const closeModal = () => setModalOpen(false);
     return (
        <div className="container mx-auto px-4 py-8 zipzap_items_list">
         {/* Display Category Sections */}
          {allCategories.map(category => (
            groupedItems[category].length > 0 && (
              <div
                key={category}
                ref={el => categoryRefs.current[category] = el} // Set ref for each category section
                className="mb-12"
              > 
                <h2 className="text-2xl font-bold mb-6">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
                  {groupedItems[category].map(item => (
                    <Card key={item.id} className="overflow-hidden" onClick={openModal}>
                      <div className="flex">
                      <CardContent className="p-4 flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                      </CardContent>
                      <CardContent className="p-0 w-48">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : null}
                      </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          ))}
          <ItemModal isOpen={isModalOpen} onClose={closeModal} item={mockItem} />
        </div>
      );
}