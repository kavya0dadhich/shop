// DropdownToggle.js
// import { useState, useEffect } from 'react';
import  { useEffect, useState } from '../share/dependencies'

const DropdownToggle = () => {
  const [hide, setHide] = useState(false);

  const toggleDropdown = () => {
    setHide(!hide);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      setHide(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    hide,
    toggleDropdown,
  };
};

export default DropdownToggle;