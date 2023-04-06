import React from 'react';

const DropdownItem = ({ item }) => {
  return (
    <li className="px-2 py-1 hover:bg-gray-200">
      <a href={item.href} className="flex items-center">
        <img src={item.icon} className="w-5 h-5 mr-2" alt="Icon" />
        <span>{item.label}</span>
      </a>
    </li>
  );
};

export default DropdownItem;
