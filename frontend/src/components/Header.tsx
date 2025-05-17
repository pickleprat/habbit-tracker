// src/components/Header.tsx
import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto flex justify-center items-center py-6 px-6">
      <Activity className="w-8 h-8 text-green-500 mr-4" />
      <h1 className="text-4xl font-bold text-gray-800 text-center">{title}</h1>
    </div>
  </header>
);

export default Header;