import { X } from "lucide-react";
import Link from "next/link";
import { TbMenu } from "react-icons/tb";

export default function Menu() {
  return (
    <nav aria-label="Main" className="group fixed bottom-6 md:bottom-10 left-1/2 z-50 h-14 w-40 -translate-x-1/2 overflow-hidden rounded-[28px] border border-gray-300 bg-[#FFE862] transition-all duration-500 md:hover:scale-110 has-checked:h-56 has-checked:w-64 has-checked:rounded-3xl has-checked:bg-[#222] md:has-checked:hover:scale-100">
      <ul className="pointer-events-none absolute inset-x-0 top-8 flex translate-y-3 flex-col items-center gap-3 text-xl font-bold text-white opacity-0 invisible transition-all duration-300 group-has-checked:visible group-has-checked:pointer-events-auto group-has-checked:translate-y-0 group-has-checked:opacity-100 group-has-checked:delay-200">
        <li>
          <Link href="#home">Home</Link>
        </li>
        <li>
          <Link href="#works">Works</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>

      <label className="absolute inset-x-0 bottom-0 flex h-14 cursor-pointer items-center justify-between px-5 text-lg font-bold text-black group-has-checked:text-white">
        <input type="checkbox" className="sr-only" />
        Menu
        <TbMenu className="size-6 group-has-checked:hidden" />
        <X className="hidden size-6 group-has-checked:block" />
      </label>
    </nav>
  );
}
