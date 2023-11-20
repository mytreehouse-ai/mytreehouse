"use client";

import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("/");
  useEffect(() => {
    setSelected(window.location.pathname);
  }, []);

  const navItems = [
    { href: "/", text: "Home" },
    { href: "/property-listings", text: "Listings" },
    { href: "/property-valuation", text: "Valuation" },
    { href: "/contact-us", text: "Contact" },
  ];
  return (
    <nav className="fixed top-0 z-50 w-full border-gray-200 bg-white p-6">
      <div className="z-20 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-emerald-600">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            MyTreeHouse
          </span>
        </a>
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
          <ul className="mt-4 flex flex-col rounded-lg font-medium rtl:space-x-reverse md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setSelected(item.href)}
                  className={`block rounded px-3 py-2 ${
                    selected === item.href
                      ? " bg-emerald-600  text-white md:bg-transparent md:p-0 md:text-emerald-600"
                      : " text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-emerald-600"
                  }`}
                  aria-current="page"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
