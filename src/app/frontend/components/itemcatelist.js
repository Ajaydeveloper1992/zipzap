'use client'
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon, MoreHorizontalIcon } from "lucide-react";
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategory } from './CategoryContext';
const menuCategories = [
  "ZipZap FAVORITES",
  "NEW ITEMS",
  "PIZZAS",
  "SALADS",
  "MAIN PLATES + PASTAS",
  "ZipZapIDS",
  "STARTERS",
  "SOUPS",
  "GLUTEN-FREE PIZZAS",
];

const moreCategories = [
  "DESSERTS",
  "BEVERAGES",
  "CATERING",
  "SEASONAL SPECIALS",
];

export default function HorizontalScrollingMenu() {
  const { activeCategory, setActiveCategory } = useCategory();
 // const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [isSticky, setIsSticky] = useState(false);
  const scrollContainerRef = useRef(null);
  const categoryRefs = useRef({}); // Initialize categoryRefs with useRef
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToCategory = (category) => {
    const categoryRef = categoryRefs.current[category];
    if (categoryRef && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: categoryRef.offsetLeft - (scrollContainerRef.current.clientWidth / 2) + (categoryRef.clientWidth / 2),
        behavior: 'smooth',
      });
    }
  };

  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateArrows);
      updateArrows();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateArrows);
      }
    };
  }, []);

  useEffect(() => {
    scrollToCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-0 zipzap_category_list">
      {/* Header Section */}
      <div className="mt-8 py-8">
        <h2 className="text-2xl font-semibold mb-4">Hakka Heritage</h2>
        {/* Add your menu items for the selected category here */}
        <p>Menu items for {activeCategory} will be displayed here.</p>
      </div>
      <div className="mt-2 py-4">
        <Image
          src="/images/12.avif"
          width={1900}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div
        className={`transition-transform duration-300 ease-in-out ${isSticky ? 'fixed top-12 left-0 right-0 z-10 bg-white shadow-md' : 'relative'}`}
      >
        <div className="container mx-auto px-4">
         
          <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
       
          <div className="relative">
            {showLeftArrow && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                onClick={() => handleScroll('left')}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            )}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide space-x-2 py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {menuCategories.map((category) => (
                <Button
                  key={category}
                  ref={(el) => categoryRefs.current[category] = el} // Assign ref to category
                  variant="ghost"
                  className={`zipzap_cate_list px-4 py-2 text-sm font-medium ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex-shrink-0 px-4 py-2 text-sm font-medium">
                    <MoreHorizontalIcon className="h-4 w-4" />
                    <span className="ml-2">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {moreCategories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => {
                        handleCategoryClick(category);
                      }}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {showRightArrow && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                onClick={() => handleScroll('right')}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Spacer to prevent content from being hidden behind the fixed header */}
      <div className="pt-24">
        {/* Add your main content here */}
        {/* <p>Main content goes here. This area is adjusted to avoid being hidden behind the fixed header.</p> */}
      </div>
    </div>
  );
}