"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const navItems = [
    { href: "/", text: "Home" },
    { href: "/property-listings", text: "Listings" },
    { href: "/property-valuation", text: "Valuation" },
    { href: "/contact-us", text: "Contact" },
  ];
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-gray-200 bg-white p-6">
        <div className="z-20 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-emerald-600">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              MyTreeHouse
            </span>
          </a>
          <div className="block md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center rounded border border-emerald-600 px-3 py-2 text-emerald-600 hover:border-emerald-600 hover:text-emerald-600"
            >
              {isOpen ? (
                <svg
                  className="h-3 w-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>Close</title>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              ) : (
                <svg
                  className="h-3 w-3 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              )}
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
                  {/* <a
                    href={item.href}
                    onClick={() => router.push(item.href)}
                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      pathName === item.href
                        ? "border-emerald-500 bg-indigo-50  text-emerald-700"
                        : "border-transparent  text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                    aria-current="page"
                  >
                    {item.text}
                  </a> */}

                  {/* <a
                    href={item.href}
                    onClick={() => router.push(item.href)}
                    className={`inline-flex items-center px-1 pt-1 text-base font-medium ${
                      pathName === item.href
                        ? " border-emerald-500 text-emerald-700"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                    aria-current="page"
                  >
                    {item.text}
                  </a> */}

                  <a
                    href={item.href}
                    onClick={() => router.push(item.href)}
                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium md:inline-flex md:items-center md:border-l-0 md:px-1 md:py-0 md:pl-0 md:pr-0 md:pt-1 ${
                      pathName === item.href
                        ? "border-emerald-500 bg-indigo-50  text-emerald-700 md:bg-transparent"
                        : "border-transparent  text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-emerald-700 md:hover:bg-transparent"
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
    </>
  );
};

export default Navbar;
