import React from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';

interface NavbarProps {
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Form Generator</h1>
        <button
          onClick={toggleDarkMode}
          className="text-white bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600"
        >
          <BiMoon className="hidden dark:block" />
          <BiSun className="block dark:hidden" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
