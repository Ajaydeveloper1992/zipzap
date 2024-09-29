'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
export default function NotFound(){
  const router = useRouter()
    return(
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Oops! Page not found</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Link href="/" passHref>
                <Button>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
      </div>
    );  
}