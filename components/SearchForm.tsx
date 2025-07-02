import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { SearchIcon } from "lucide-react";

function SearchForm() {
  const query = "test";

  return (
    <Form
      action="/projects"
      scroll={false}
      className="flex items-center justify-center w-full max-w-3xl gap-2"
    >
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search..."
      />

      <div className="flex items-center justify-center">
        {query && <SearchFormReset />}
        <button type="submit" className="search-button">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
    </Form>
  );
}

export default SearchForm;
