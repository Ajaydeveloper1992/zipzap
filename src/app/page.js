'use client'
import { Suspense } from 'react';
import Header from './frontend/components/header';
import Footer from './frontend/components/footer';
import HorizontalScrollingMenu from './frontend/components/itemcatelist';
import Items from './frontend/components/items';
import { CategoryProvider } from './frontend/components/CategoryContext';
import Loading from './frontend/components/Loading';
export default function Home() {
  return (
      <>
      <Suspense fallback={<Loading />}>  
      <Header/>
      <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Suspense fallback={<Loading />}>  
        <CategoryProvider>
          <HorizontalScrollingMenu/>
          <Suspense fallback={<ItemsGlimmer />}>  
          <Items/>
          </Suspense>
          </CategoryProvider>
      </Suspense>
      </main>
      
      <Footer/>
      </Suspense>
      </>
  );
}

function ItemsGlimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}