import React from 'react';
import { Home, PlusCircle, User, Settings } from 'lucide-react';

const Navbar: React.FC = () => (
  <nav className="bg-white shadow-inner py-3 px-6 flex justify-around">
    <Home className="w-6 h-6 text-gray-600" />
    <PlusCircle className="w-6 h-6 text-gray-600" />
    <User className="w-6 h-6 text-gray-600" />
    <Settings className="w-6 h-6 text-gray-600" />
  </nav>
);

export default Navbar;