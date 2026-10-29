"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import { TbMenu } from "react-icons/tb";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function Menu() {
  const toggleRef = useRef<HTMLInputElement>(null);
  // Close the menu once a section is picked.
  const close = () => {
    if (toggleRef.current) toggleRef.current.checked = false;
  };

  return (
    <nav
      aria-label="Main"
      className="group fixed bottom-6 md:bottom-10 left-1/2 z-50 h-14 w-40 -translate-x-1/2 overflow-hidden rounded-[28px] border border-ink/10 bg-sun shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] transition-all duration-500 md:hover:scale-110 has-checked:h-80 has-checked:w-64 has-checked:rounded-3xl has-checked:bg-ink md:has-checked:hover:scale-100"
    >
      <ul className="pointer-events-none absolute inset-x-0 top-8 flex translate-y-3 flex-col items-center gap-3 text-xl font-bold text-white opacity-0 invisible transition-all duration-300 group-has-checked:visible group-has-checked:pointer-events-auto group-has-checked:translate-y-0 group-has-checked:opacity-100 group-has-checked:delay-200">
        {links.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              onClick={close}
              className="transition-colors duration-300 hover:text-sun"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <label className="absolute inset-x-0 bottom-0 flex h-14 cursor-pointer items-center justify-between px-5 text-lg font-bold text-black group-has-checked:text-white">
        <input ref={toggleRef} type="checkbox" className="sr-only" />
        Menu
        <TbMenu className="size-6 group-has-checked:hidden" />
        <X className="hidden size-6 group-has-checked:block" />
      </label>
    </nav>
  );
}
