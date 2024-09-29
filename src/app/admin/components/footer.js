import { Copyright } from "lucide-react"
export default function Footer(){
    const currentYear = new Date().getFullYear()
    return(
        <div className="py-4 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center">
                <Copyright className="mr-2 h-4 w-4" />
                <p>
                Copyright © {currentYear} Zipzappos. All rights reserved.
                </p>
            </div>
        </div>
       );
}