"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks () {
    const pathname = usePathname();
    

    const links = [
        {href: "/", label: "Home"},
        {href: "/projects", label: "Projects"},
        {href: "/about", label: "About" },
        {href: "/contact", label: "Contact"},

    ];

    return(
        <nav className="flex gap-4">
            {links.map((link) => {
                const isActive = pathname === link.href;

                return(
                    <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page": undefined}
                    className={
                        isActive
                        ? "font-bold text-black underline"
                        : "text-white-500 hover:text-black"
                    }
                    >
                        {link.label}
                    </Link>

                );
            })}
        </nav>
    );
}