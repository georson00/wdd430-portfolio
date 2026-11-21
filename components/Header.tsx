import NavLinks from "./NavLinks";
import { Suspense } from "react";

export default function Header() {
    return (
        <header className="bg-green-600 text-white py-4 shadow-md" >
            <div id="header-title" className="text-2xl font-bold">Nelson Georges</div>


            <nav className="max-w-4xl mx-auto px-4 flex justify-betweeb items-center" >
            <Suspense fallback={null}>
                <NavLinks />
            </Suspense>
            
            </nav>
        
        </header>
    );
}