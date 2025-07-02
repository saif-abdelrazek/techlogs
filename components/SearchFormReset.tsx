"use client";
import React from "react";
import Link from "next/link";

function SearchFormReset() {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button type="reset" className="search-reset" onClick={reset}>
      <Link href="/projects">X</Link>
    </button>
  );
}

export default SearchFormReset;
