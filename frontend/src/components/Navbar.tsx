// src/components/Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, User, Settings } from 'lucide-react';

const navItems = [
  { to: '/',         icon: Home,         label: 'Home'     },
  { to: '/add',      icon: PlusCircle,   label: 'Add'      },
  { to: '/profile',  icon: User,         label: 'Profile'  },
  { to: '/settings', icon: Settings,     label: 'Settings' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-t border-gray-200 shadow-inner fixed bottom-0 w-full">
      <div className="max-w-5xl mx-auto flex justify-around py-3">
        {navItems.map(({ to, icon: Icon, label }) => {
          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center text-sm ${
                  isActive
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <Icon className="w-6 h-6 mb-1" />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
