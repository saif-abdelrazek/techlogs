import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function SearchForm({ query }: { query?: string }) {
  return (
    <Form
      action="/projects"
      scroll={false}
      id="search-form"
      className="max-w-3xl w-full min-h-[64px] bg-blue-50/80 dark:bg-[#1e293b] border-2 border-blue-200 dark:border-sky-800 rounded-full text-[20px] mt-8 px-3 flex flex-row items-center gap-3 shadow-md focus-within:ring-2 focus-within:ring-blue-400 transition"
    >
      <input
        id="search-input"
        name="query"
        defaultValue={query}
        className="flex-1 font-semibold placeholder:font-normal placeholder:text-blue-400 dark:placeholder:text-sky-400 bg-transparent text-blue-900 dark:text-sky-100 w-full h-auto outline-none px-4 py-3 rounded-full"
        placeholder="Search projects..."
        autoComplete="off"
      />

      <div className="flex items-center justify-center gap-1">
        {query && <SearchFormReset />}
        <Button
          type="submit"
          className="size-[48px] rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-sky-700 dark:hover:bg-sky-600 flex justify-center items-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <Search className="w-6 h-6 text-white" />
        </Button>
      </div>
    </Form>
  );
}

export default SearchForm;
