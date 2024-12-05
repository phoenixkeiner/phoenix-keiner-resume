import React, { useState } from "react";
import ReactImage from '../images/logo192.png';

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="sticky top-0 w-full z-50 flex items-center justify-between px-4 py-3 shadow-md bg-[#9f8ce0]">
      <div className="flex items-center">
        <img
          src={ReactImage}
          alt="React Logo"
          className="h-12 w-12"
        />
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center rounded-md bg-[#61dbfb] px-4 py-2 text-sm font-medium text-stone-700 hover:bg-[#57c5e2] focus:outline-none"
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          Projects
          <svg
            className="ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-[#FF6224] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-300 ease-out ${
            isDropdownOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href="https://phoenixkeiner.github.io/bmt-notes/"
              className="flex items-center px-4 py-2 text-sm text-stone-300"
              role="menuitem"
            >
              <img
                src={require('../images/logo192.png')}
                alt="Logo"
                className="h-4 w-4 mr-2"
              />
              Bang Muay Thai Notes
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
