"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between bg-white p-6">
      <div className="z-20 mr-6 flex flex-shrink-0 items-center justify-between text-emerald-600">
        <Link href="/">
          <span className="text-xl font-semibold tracking-tight">
            MyTreeHouse
          </span>
        </Link>
      </div>
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center rounded border border-emerald-600 px-3 py-2 text-emerald-600 hover:border-emerald-600 hover:text-emerald-600"
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "z-50 block" : "hidden"
        } block w-full flex-grow md:flex md:w-auto md:items-center md:justify-end `}
      >
        <div className="text-sm font-semibold md:flex-grow">
          <Link
            href="/"
            className="mr-4 mt-4 block hover:text-emerald-600 md:mt-0 md:inline-block"
          >
            Home
          </Link>
          <Link
            href="/property-listings"
            className="mr-4 mt-4 block hover:text-emerald-600 md:mt-0 md:inline-block"
          >
            Listings
          </Link>
          <Link
            href="/property-valuation"
            className="mr-4 mt-4 block hover:text-emerald-600 md:mt-0 md:inline-block"
          >
            Valuation
          </Link>
          <Link
            href="/contact-us"
            className="mt-4 block hover:text-emerald-600 md:mt-0 md:inline-block"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
