"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavbarProps {
  shadowMd?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ shadowMd }) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 w-full bg-white p-4 text-slate-800",
        shadowMd ? "shadow-md" : "",
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Home
            </Link>
            <Link
              href="/property-listings"
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Listings
            </Link>
            <Link
              href="/property-valuation"
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Valuation
            </Link>
            <Link
              href="/contact-us"
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
