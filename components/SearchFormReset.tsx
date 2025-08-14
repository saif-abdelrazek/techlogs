"use client";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

function SearchFormReset() {
  const reset = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button type="reset" onClick={reset}>
    <Link
      href="/projects"
      className="size-[48px] rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-sky-700 dark:hover:bg-sky-600 flex justify-center items-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      aria-label="Reset search"
      tabIndex={0}
    >
      <X className="w-6 h-6 text-white" />
    </Link>
    </button>
  );
}

export default SearchFormReset;
