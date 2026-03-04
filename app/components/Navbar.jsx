// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\components\Navbar.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "./Data";
import { SearchIcon, WishlistIcon, CartIcon, MenuIcon, CloseIcon } from "./Icons";

// Map each nav label → the section ID it should scroll to
const NAV_TARGETS = {
  "Home":      "section-hero",
  "Shop Pets": "section-categories",
  "Services":  "section-services",
  "About":     "section-why",
  "Contact":   "section-newsletter",
};

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState("Home");
  const menuRef             = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Close on resize to desktop
  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setOpen(false); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function handleNav(link) {
    setActive(link);
    setOpen(false);
    smoothScrollTo(NAV_TARGETS[link] ?? "section-hero");
  }

  return (
    /*
      FIX 1: Removed `backdrop-blur` from <nav>.
      backdrop-filter creates a new stacking context which was trapping the
      absolute-positioned dropdown inside it, making it render BEHIND other
      page sections. Replaced with bg-white/95 — visually identical.
    */
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 bg-white/95 border-b border-slate-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => handleNav("Home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">P</div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">PetHaven</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => handleNav(link)}
                className={`text-sm font-medium transition-colors ${
                  active === link ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop action icons + hamburger */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-slate-500 hover:text-slate-800 transition-colors" aria-label="Search"><SearchIcon /></button>
          <button className="hidden md:flex relative text-slate-500 hover:text-slate-800 transition-colors" aria-label="Wishlist">
            <WishlistIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">2</span>
          </button>
          <button className="hidden md:flex relative text-slate-500 hover:text-slate-800 transition-colors" aria-label="Cart">
            <CartIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
          </button>

          {/* Hamburger — z-[52] keeps it above the dropdown (z-[51]) */}
          <button
            className="md:hidden relative z-[52] p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/*
        FIX 2: Dropdown is absolute-positioned at top-full with z-[51].
        Because we removed backdrop-blur above, there is no trapped stacking
        context — so this div correctly floats above Hero and all page sections.
        max-h transition animates open/close smoothly without any JS height math.
      */}
      <div
        className={`
          md:hidden absolute top-full left-0 right-0 z-[51]
          bg-white border-t border-slate-100 shadow-xl
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        `}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`text-left text-sm font-medium rounded-xl px-3 py-2.5 transition-colors ${
                active === link
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              {link}
            </button>
          ))}

          {/* Mobile icons row */}
          <div className="flex items-center gap-1 pt-3 mt-2 border-t border-slate-100">
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <SearchIcon /> Search
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <WishlistIcon /> Wishlist
              <span className="w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">2</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <CartIcon /> Cart
              <span className="w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}