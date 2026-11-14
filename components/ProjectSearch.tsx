
"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset pagination whenever the search changes
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6">
      <label
        htmlFor="project-search"
        className="mb-2 block font-medium"
      >
        Search Projects
      </label>

      <input
        id="project-search"
        type="search"
        placeholder="Search by title or description..."
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-3"
      />
    </div>
  );
}
