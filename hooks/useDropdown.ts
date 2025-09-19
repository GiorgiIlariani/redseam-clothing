import { useState, useRef } from "react";
import { useOutsideClick } from "./useOutsideClick";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return {
    isOpen,
    dropdownRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
};
