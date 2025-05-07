import { SearchIcon } from "assets";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleClick = () => {
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 px-20">
      <h1
        className="logo-s font-carter text-primary-600"
        onClick={handleLogoClick}
      >
        Curio
      </h1>
      <div className="bg-primary-50 flex w-124.5 rounded-2xl pr-3 pl-6">
        <input
          className="w-full py-2.5 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}
