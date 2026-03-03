"use client";
import { useState } from "react";
import { NAV_LINKS } from "./Data";
import { SearchIcon, WishlistIcon, CartIcon, MenuIcon, CloseIcon } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            P
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">PetHaven</span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`text-sm font-medium transition-colors ${
                  link === "Home" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-slate-500 hover:text-slate-800 transition-colors">
            <SearchIcon />
          </button>

          <button className="hidden md:flex relative text-slate-500 hover:text-slate-800 transition-colors">
            <WishlistIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </button>

          <button className="hidden md:flex relative text-slate-500 hover:text-slate-800 transition-colors">
            <CartIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-600"
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}